
// Enable input on all table cells
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

// Generate a random cell index
function pickACell() { return Math.floor(Math.random() * 81); }

// Generate a random number from 1 to 9
function pickANumber() { return Math.floor(Math.random() * 9 + 1); }

// Generate a random template of 17 filled cells at the start
let alreadyPickedCells = [];
let cellArray = document.getElementsByTagName("td");
let outsideCount = 0;
function generateTemplate() {
    for (i = 0; i < 72; i++) {
        let pickedCell = pickACell();

        // Colum check-------------------------------------------------------------------------------START
        // Get the index of the picked cell and reduce it to the first at the top of the column
        let reduceToSameColumn = pickedCell;
        if (reduceToSameColumn > 8) {
            let fitsHowMany = Math.floor(reduceToSameColumn / 9);
            reduceToSameColumn = reduceToSameColumn - (9 * fitsHowMany);
        }
        // Get all indexes of the cells in the same column
        let sameColumn = [];

        for (j = reduceToSameColumn; j < 81; j += 9) {
            sameColumn.push(j);

        }
        let reduceToSameRow = sameColumn[0] // Belongs to row check

        // Remove the picked cell so it does not check its own innerText
        let removeACell = sameColumn.indexOf(pickedCell);
        sameColumn.splice(removeACell, 1);


        // Colum check---------------------------------------------------------------------------------END

        let firstRowIndex = pickedCell - reduceToSameRow;
        let nineTimes = 0;
        let sameRow = [];

        for (nineTimes = 0; nineTimes < 9; nineTimes++) {
            if (nineTimes === reduceToSameRow) {
                continue;
            } else {
                sameRow.push(cellArray[firstRowIndex + nineTimes]);
            }
        }
        /* If the cell picked in the current iteration doesn't match any that were previously picked,
           add number between 1 and 9 to it. Otherwise skip it and reduce the count by one. */
        if (alreadyPickedCells.includes(pickedCell) === false) {
            cellArray[pickedCell].innerText = pickANumber();
            alreadyPickedCells.push(pickedCell);
            // If the current picked cell matches the text of any in the same column, reset its text and reduce the  generateTemplate count by 1
            for (k = 0; k < 8; k++) {
                if (cellArray[pickedCell].innerText === cellArray[sameColumn[k]].innerText || cellArray[pickedCell].innerText === sameRow[k].innerText) {
                    cellArray[pickedCell].innerText = "";
                    outsideCount += 1;
                    i--;
                    k = 20;
                    alreadyPickedCells.pop();

                }
            }
        } else if (alreadyPickedCells.includes(pickedCell) === true) {
            i--;
        }

        if (outsideCount > 1000) {
            console.log(outsideCount);
            for (mile = 0; mile < 81; mile++) {
                cellArray[mile].innerText = "";

            }
            outsideCount = 0;
            i = 0;
            alreadyPickedCells = [];

        }
    }
    alreadyPickedCells = [];
}
// console.log(outsideCount);
// if (outsideCount > 1000) {
//     console.log(outsideCount);
// }

// Generate template when the page is refreshed
generateTemplate();
// setTimeout(function () {
//     generateTemplate();
// }, 10000)


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
