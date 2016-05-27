document.addEventListener('DOMContentLoaded',work)

function work() {
    document.getElementById('submit').addEventListener('click', function(event) {
        
        var formData = document.getElementById('addNew');
        var url = "/insert/?name=" + formData.elements.name.value +
                  "&reps=" + formData.elements.reps.value + 
                  "&weight=" + formData.elements.weight.value + 
                  "&lbs=" + formData.elements.lbs.value + 
                  "&date=" + formData.elements.date.value;
        

        var req = new XMLHttpRequest();
        req.open('GET', url, true);
        req.addEventListener('load',function(){
            if(req.status >= 200 && req.status < 400) {
                //var response = JSON.parse(req.responseText);
                var response = JSON.parse(req.responseText);
                if (response.lbs == "1") {
                    response.lbs = lbs;
                }
                else {
                    response.lbs = kg;
                }
                var workoutDB = document.getElementById('workoutDB');
                var newRow = workoutDB.insertRow(-1);

                for (var prop in response) {
                    var newCell = newRow.insertCell(-1);
                    var newText = document.createTextNode(response[prop]);
                    newCell.appendChild(newText);
                }

                /*var idCell = document.createElement('td');
                var idValue = document.createTextNode(response.id);
                idCell.appendChild(idValue);
                newRow.appendChild(cell);*/
                /*
                console.log(response.name);
                var nameCell = document.createElement('td');
                nameCell.textContent = response.name;
                newRow.appendChild(cell);

                console.log(response.reps);
                var repsCell = document.createElement('td');
                repsCell.textContent = response.reps;
                newRow.appendChild(cell);

                console.log(response.weight);
                var weightCell = document.createElement('td');
                cell.textContent = response.weight;
                newRow.appendChild(cell);

                console.log(response.lbs);
                var lbsCell = document.createElement('td');
                lbsCell.textContent = response.lbs;
                newRow.appendChild(cell);

                console.log(response.date);
                var dateCell = document.createElement('td');
                dateCell.textContent = response.date;
                newRow.appendChild(cell);
            */


                //workoutDB.appendChild(newRow);
            }
        });
        req.send(null); 
        event.preventDefault();
    });

}
