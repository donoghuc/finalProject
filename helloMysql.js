var express = require('express');
var mysql = require('./dbcon.js');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);
app.use(express.static('public'));

/* here is the main page. you get everything from the database when you navigate here. 
All rendering is done in home.handlebars here. it sets up the table and sets up my 
system for indexing the rows to be editid and deletid (id=joke)*/
app.get('/',function(req,res,next){
  var context = {}; //for rendering in handlebars
  //set up call to mysql (modified from worlford github examples)
  mysql.pool.query('SELECT * FROM workouts', function(err, rows, fields){  
    if(err){
      next(err);
      return;
    }
    //array for sending back data for rendering table
    var workoutDBdata = [];
    //get data and create an object to render in the workoutDBdata array
    for(var i in rows) {
      var rowToObject = {};
      rowToObject.id = rows[i].id;
      rowToObject.name = rows[i].name;
      rowToObject.reps = rows[i].reps;
      rowToObject.weight = rows[i].weight; 
      if (rows[i].lbs == true) {  //turn in to kg or lbs here based on bool value
        rowToObject.lbs = "lbs";
      }
      else if (rows[i].lbs == false) {
        rowToObject.lbs = "kg";
      }
      rowToObject.date = rows[i].date; 

      workoutDBdata.push(rowToObject); //push into array
    }

    context.workoutDBdata = workoutDBdata; //render
    res.render('home', context);
    
  });
});

/* This is the badass that i started with. the work is easy (from /insert method for in class material)
Making it happen asynchonous w/o reloading page was the hard part. */

app.get('/insert',function(req,res,next){
  var context = {};
  mysql.pool.query("INSERT INTO workouts (`name`,`reps`,`weight`,`lbs`,`date`) VALUES (?,?,?,?,?)", [req.query.name,
    req.query.reps, req.query.weight, req.query.lbs, req.query.date], function(err, result){
    if(err){
      next(err);
      return;
    }
    mysql.pool.query("SELECT * FROM workouts WHERE id=?",[result.insertId],function(err,result){
      if(err){
        next(err);
        return;
      }
      if(result.length == 1) {
        var newRow = result[0];
        res.send(newRow);
      }
    });
    //context.newID = result.insertId;
    //res.send(context);
    //context.results = "Inserted id " + result.insertId;
    //res.render('home',context);
  });




});

/*THis will take the id of the row to be deleted. It is pretty straight forward
no response. didnt need much here Ajax is doing alot in script.js*/
app.get('/delete',function(req,res,next){
  mysql.pool.query("DELETE FROM workouts WHERE id=?", [req.query.id], function(err, result){
    if(err){
      next(err);
      return;
    }
    res.send(null);
  });
});

/*
///simple-update?id=2&name=The+Task&done=false&due=2015-12-5
app.get('/simple-update',function(req,res,next){
  var context = {};
  mysql.pool.query("UPDATE todo SET name=?, done=?, due=? WHERE id=? ",
    [req.query.name, req.query.done, req.query.due, req.query.id],
    function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = "Updated " + result.changedRows + " rows.";
    res.render('home',context);
  });
});
*/
/*
///safe-update?id=1&name=The+Task&done=false
app.get('/safe-update',function(req,res,next){
  var context = {};
  mysql.pool.query("SELECT * FROM todo WHERE id=?", [req.query.id], function(err, result){
    if(err){
      next(err);
      return;
    }
    if(result.length == 1){
      var curVals = result[0];
      mysql.pool.query("UPDATE todo SET name=?, done=?, due=? WHERE id=? ",
        [req.query.name || curVals.name, req.query.done || curVals.done, req.query.due || curVals.due, req.query.id],
        function(err, result){
        if(err){
          next(err);
          return;
        }
        context.results = "Updated " + result.changedRows + " rows.";
        res.render('home',context);
      });
    }
  });
});
*/
app.get('/safe-update',function(req,res,next){
  console.log("made it");
  console.log(req.query.id);

  var context = {};
  mysql.pool.query("SELECT * FROM workouts WHERE id=?", [req.query.id], function(err, result){
    if(err){
      next(err);
      return;
    }

    console.log(rows[0].name); 

    }
  });
    /*
    if(result.length == 1){
      var curVals = result[0];
      mysql.pool.query("UPDATE workouts SET name=?, reps=?, weight=?, date=?, lbs=? WHERE id=? ",
        [req.query.name || curVals.name, req.query.reps || curVals.reps, req.query.weight || curVals.weight, req.query.date || curVals.date, req.query.lbs || curVals.lbs, req.query.id],
        function(err, result){
        if(err){
          next(err);
          return;
        }
        context.results = "Updated " + result.changedRows + " rows.";
        res.render('home',context);
      });
    }
  }); */
});


/*
app.get('/reset-table',function(req,res,next){
  var context = {};
  mysql.pool.query("DROP TABLE IF EXISTS todo", function(err){
    var createString = "CREATE TABLE todo(" +
    "id INT PRIMARY KEY AUTO_INCREMENT," +
    "name VARCHAR(255) NOT NULL," +
    "done BOOLEAN," +
    "due DATE)";
    mysql.pool.query(createString, function(err){
      context.results = "Table reset";
      res.render('home',context);
    })
  });
});
*/

app.get('/reset-table',function(req,res,next){
  var context = {};
  mysql.pool.query("DROP TABLE IF EXISTS workouts", function(err){ //replace your connection pool with the your variable containing the connection pool
    var createString = "CREATE TABLE workouts("+
    "id INT PRIMARY KEY AUTO_INCREMENT,"+
    "name VARCHAR(255) NOT NULL,"+
    "reps INT,"+
    "weight INT,"+
    "lbs BOOLEAN,"+
    "date DATE)";
    mysql.pool.query(createString, function(err){
      context.results = "Table reset";
      res.render('home',context);
    })
  });
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});

//test