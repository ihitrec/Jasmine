
// Enable input on table cells
$("td").attr("contenteditable", "true");

// Add a key up function on each cell
$("td").attr("onkeyup", "myFunc()");

// If entered key is a number, keep it. Otherwise delete it.
function myFunc() {
    let whichCell = this.event.path[0];
    if (Number.isNaN(parseInt(this.event.key)) == false) {
        let numKey = this.event.key;
        whichCell.innerText = numKey;
    } else if (Number.isNaN(parseInt(this.event.key)) == true) {
        whichCell.innerText = "";
    }

}

// Generate a random cell using the cellArray variable 
function pickACell() { return Math.floor(Math.random() * 81); }

// Generate a random number from 1 to 9
function pickANumber() { return Math.floor(Math.random() * 9 + 1); }

// Generate a random template of 17 filled cells at the start
let alreadyPickedCell = [];
let cellArray = document.getElementsByTagName("td");
function generateTemplate() {

    for (i = 0; i < 17; i++) {
        let pickedCell = pickACell();
        /* If the cell picked in the current iteration doesn't match any that were previously picked,
           add a random number to it. Otherwise skip it and reduce the count by one. */
        if (alreadyPickedCell.includes(pickedCell) === false) {
            cellArray[pickedCell].innerText = pickANumber();
            alreadyPickedCell.push(pickedCell);
        } else if (alreadyPickedCell.includes(pickedCell) === true) {
            i--;
        }
    }
}
generateTemplate();
function resetTemplate() {
    for (i = 0; i < cellArray.length; i++) {
        cellArray[i].innerText = "";
    }
}
$("button").click(function () {
    resetTemplate();
    generateTemplate();
})
