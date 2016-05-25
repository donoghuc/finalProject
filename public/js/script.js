/*Cas Donoghue
CS290 WEB DEV
29APR2016
HW Assignment DOM and EVENTS
For use with index.html. Make a dynamic table with javascript. the user can move around a 3x3 matrix and select
to turn cells yellow. 
*/
//Start by building the table
// get the reference for the body
var body = document.getElementsByTagName("body")[0];
 
// create the table, head and body
var tbl     = document.createElement("table");
var tblHead = document.createElement("thead"); 
var tblBody = document.createElement("tbody");

//make the header
var headerRow = document.createElement("tr"); 
//assign header lables to table data cells in the header row
for (var k = 1; k < 5; k++) {
var headCell = document.createElement("td"); //create the data cell
var headText = document.createTextNode("Header "+k); //define text content
headCell.appendChild(headText); //add text content to cell
headerRow.appendChild(headCell); //add cell to the row
}
//assign the new node
tblHead.appendChild(headerRow); //add the row to the head
 
//now use a nested loop to define all the data cells (the ones user can toggle through)
for (var i = 1; i < 4; i++) {
    // creates a table row
  var row = document.createElement("tr"); //call our the row
 
  for (var j = 1; j < 5; j++) {
      // Create a <td> element and a text node, make the text
      // node the contents of the <td>, and put the <td> at
      // the end of the table row
    var cell = document.createElement("td"); //create 4 data cells
    var cellText = document.createTextNode(j+", "+i); //define text for each cell
    cell.appendChild(cellText); //add text to data cell
    row.appendChild(cell); //add cell to row
   }
 
    // add the row to the end of the table body
   tblBody.appendChild(row); //add the row to the table body
 }
  // put the <thead> in the <table>
tbl.appendChild(tblHead); 
  // put the <tbody> in the <table>
tbl.appendChild(tblBody);
  // appends <table> into <body>
body.appendChild(tbl);
  // put a border aroud the table;
tbl.setAttribute("border","1"); //set a border around the table
var currentCell = [0,0]; // THIS IS VERY IMPORTANT it is a global variable that marks the current seleted cell. default is top left
tbl.children[1].children[currentCell[0]].children[currentCell[1]].style.border = 'solid 2px'; //set the current cell border to bold
/*the idea of these move and mark functions is that the currentCell array holds position that is referenced by the 2nd and third children
in the tree. When a function is called it sets the current cell border to default (1px), then increments or decrements the current cell
(if allowed) and sets the current cell to a thick (2px) border. for the Mark function, currentCell is not changed, it is simply marked yellow. 
*/
function movUp() {
     tbl.children[1].children[currentCell[0]].children[currentCell[1]].style.border = 'solid 1px';
     if ((currentCell[0] == 1) || (currentCell[0] == 2)) {
        currentCell[0] -= 1; 
     }
     tbl.children[1].children[currentCell[0]].children[currentCell[1]].style.border = 'solid 2px';
}
function movDown() {
     tbl.children[1].children[currentCell[0]].children[currentCell[1]].style.border = 'solid 1px';
     if ((currentCell[0] == 0) || (currentCell[0] == 1)) {
        currentCell[0] += 1; 
     }
     tbl.children[1].children[currentCell[0]].children[currentCell[1]].style.border = 'solid 2px';
}
function movLeft() {
    tbl.children[1].children[currentCell[0]].children[currentCell[1]].style.border = 'solid 1px';
     if ((currentCell[1] == 1) || (currentCell[1] == 2) || (currentCell[1] == 3)) {
        currentCell[1] -= 1; 
     }
     tbl.children[1].children[currentCell[0]].children[currentCell[1]].style.border = 'solid 2px';

}
function movRight() {
    tbl.children[1].children[currentCell[0]].children[currentCell[1]].style.border = 'solid 1px';
     if ((currentCell[1] == 0) || (currentCell[1] == 1) || (currentCell[1] == 2)) {
        currentCell[1] += 1; 
     }
     tbl.children[1].children[currentCell[0]].children[currentCell[1]].style.border = 'solid 2px';

}
function markCell() {
    tbl.children[1].children[currentCell[0]].children[currentCell[1]].style.backgroundColor = 'yellow';
}

//make the UP button
var upButton = document.createElement("button");
upButton.id = "upButton";
var upText = document.createTextNode("UP"); 
upButton.appendChild(upText);
document.body.appendChild(upButton);
document.getElementById("upButton").addEventListener("click",movUp);
//make the UP button
var downButton = document.createElement("button");
downButton.id = "downButton";
var downText = document.createTextNode("DOWN"); 
downButton.appendChild(downText);
document.body.appendChild(downButton);
document.getElementById("downButton").addEventListener("click",movDown);
//make the UP button
var rightButton = document.createElement("button");
rightButton.id = "rightButton";
var rightText = document.createTextNode("RIGHT"); 
rightButton.appendChild(rightText);
document.body.appendChild(rightButton);
document.getElementById("rightButton").addEventListener("click",movRight);
//make the UP button
var leftButton = document.createElement("button");
leftButton.id = "leftButton";
var leftText = document.createTextNode("LEFT"); 
leftButton.appendChild(leftText);
document.body.appendChild(leftButton);
document.getElementById("leftButton").addEventListener("click",movLeft);
//make MARK button
var markButton = document.createElement("button");
markButton.id = "markButton";
var markText = document.createTextNode("MARK"); 
markButton.appendChild(markText);
document.body.appendChild(markButton);
document.getElementById("markButton").addEventListener("click",markCell);
