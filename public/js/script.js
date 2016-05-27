document.addEventListener('DOMContentLoaded',work) //wait for load, then call generall work function
//work: just a start point to start llistening for clicks and to keep formattting the DOM alive
function work() {
    //this will handle submission. Ajax will update database and DOM will show new tables added durring this session
    document.getElementById('submit').addEventListener('click', function(event) {
        //
        var formData = document.getElementById('addNew'); //get data from from and put into query string
        var url = "/insert/?name=" + formData.elements.name.value +
                  "&reps=" + formData.elements.reps.value + 
                  "&weight=" + formData.elements.weight.value + 
                  "&lbs=" + formData.elements.lbs.value + 
                  "&date=" + formData.elements.date.value;
        

        var req = new XMLHttpRequest(); //for ajax request to /insert (will return new row from database)
        req.open('GET', url, true); //for ajax, url formed above asynchronous
        req.addEventListener('load',function(){
            if(req.status >= 200 && req.status < 400) {
                //get response
                var response = JSON.parse(req.responseText); //this parses the returned row 
                //modify based on boolean value for lbs (true) kg (false)
                if (response.lbs == "1") {
                    response.lbs = "lbs";
                }
                else {
                    response.lbs = "kg";
                }
                //this just appends the row visually using DOM (that way you dont have to reload to see what you added)
                var workoutDB = document.getElementById('workoutDB');
                var newRow = workoutDB.insertRow(-1);
                newRow.setAttribute("id",response.id);
                //love how easy it is to get through object params in JS (been in c world for Operating systems class...)
                for (var prop in response) {
                    var newCell = newRow.insertCell(-1);
                    var newText = document.createTextNode(response[prop]);
                    newCell.appendChild(newText);
                }

                var btn = document.createElement("BUTTON");
                var t = document.createTextNode("Edit");
                btn.appendChild(t);
                var editCell = newRow.insertCell(-1)
                editCell.appendChild(btn);

                var btn = document.createElement("BUTTON");
                btn.type = "button";
                //btn.name = "Delete";
                btn.value = response.id;
                var t = document.createTextNode("Delete");
                btn.onclick = function() {deleteFunction(this.value)};
                btn.appendChild(t);
                var editCell = newRow.insertCell(-1)
                editCell.appendChild(btn);

            }
        });
        req.send(null); 
        event.preventDefault();
    });
    /*
    document.getElementById('deleteMe').addEventListener('click', function(event) {
    deleteFunction(this.value);
    }); */
}

function deleteFunction(rowToDelete) {
    document.getElementById(rowToDelete).style.backgroundColor = "blue";
    console.log(rowToDelete);
};



