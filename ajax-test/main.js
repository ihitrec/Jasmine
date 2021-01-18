
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
let alreadyPickedCells = [];
let cellArray = document.getElementsByTagName("td");
function generateTemplate() {
    for (i = 0; i < 17; i++) {
        let pickedCell = pickACell();
        // Get the index of a cell and change it to contain the cell at the top of the row
        let reduceToSameRow = pickedCell;
        if (reduceToSameRow > 9) {
            let fitsHowMany = Math.floor(reduceToSameRow / 9);
            reduceToSameRow = reduceToSameRow - (9 * fitsHowMany);
        }
        // Get all indexes of the cells in the same rows
        let sameRow = [];
        for (j = reduceToSameRow; j < 81; j += 9) {
            sameRow.push(j);
        }
        /* If the cell picked in the current iteration doesn't match any that were previously picked,
           add number between 1 and 9 to it. Otherwise skip it and reduce the count by one. */
        if (alreadyPickedCells.includes(pickedCell) === false) {
            cellArray[pickedCell].innerText = pickANumber();
            alreadyPickedCells.push(pickedCell);
            let isIt;
            for (k = 0; k < sameRow.length; k++) {
                if (cellArray[alreadyPickedCells[i]].innerText === cellArray[sameRow[k]].innerText) {
                    isIt = true;
                    return isIt;
                }
            }
            if (isIt === true) {
                cellArray[pickedCell].innerText = "";
            }

        } else if (alreadyPickedCells.includes(pickedCell) === true) {
            i--;
        }
    }
    alreadyPickedCells = [];
}

// function sameRow(currentCell) {
//     let currentRow;
//     for (i = cellArray.indexOf(pickedCell); i < 82; i += 9) {
//         console.log(cellArray[i]);
//     }

// }

// Generate template when the page is refreshed
generateTemplate();

// Reset the text of each cell
function resetTemplate() {
    for (i = 0; i < cellArray.length; i++) {
        cellArray[i].innerText = "";

    }
}

// Button which resets the template and generates a new one
$("button").click(function () {
    resetTemplate();
    generateTemplate();
})
