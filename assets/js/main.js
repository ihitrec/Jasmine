$(document).ready(function () {

    let lastSelectedNum;

    // Premade grids
    let grid1 = [6, 5, 9, "", 1, "", 2, 8, "", 1, "", "", "", 5, "", "", 3, "", 2, "", "", 8, "", "", "", 1, "", "", "", "", 1, 3, 5, "", 7, "", 8, "", "", 9, "", "", "", "", 2, "", "", 3, "", 7, 8, 6, 4, "", 3, "", 2, "", "", 9, "", "", 4, "", "", "", "", "", 1, 8, "", "", "", "", 8, 7, 6, "", "", "", ""];

    // Premade grids filled
    grid1Solved = [6, 5, 9, 3, 1, 4, 2, 8, 7, 1, 8, 7, 6, 5, 2, 4, 3, 9, 2, 3, 4, 8, 9, 7, 5, 1, 6, 4, 2, 6, 1, 3, 5, 9, 7, 8, 8, 7, 1, 9, 4, 6, 3, 5, 2, 5, 9, 3, 2, 7, 8, 6, 4, 1, 3, 1, 2, 5, 8, 9, 7, 6, 4, 7, 6, 5, 4, 2, 1, 8, 9, 3, 9, 4, 8, 7, 6, 3, 1, 2, 5];


    // Transfer all cells to new array to manipulate it.
    let cellArray = [];
    let cellArrayItems = document.getElementsByTagName("td");
    for (i = 0; i < cellArrayItems.length; i++) {
        cellArray.push(cellArrayItems[i]);
    }

    // Enable input on all table cells
    $("td").attr("contenteditable", "true");

    // Add a key up function on each cell, if entered key is a number, keep it. Otherwise delete it.
    // Check if entered value is correct.
    $("td").keyup(isNum);
    function isNum() {
        let whichCell = this;
        if (Number.isNaN(parseInt(event.key)) == false && event.key !== "0") {
            let numKey = event.key;
            whichCell.innerText = numKey;
            lastSelectedNum = event.key;
            enteredValueCheck();
        } else if (Number.isNaN(parseInt(event.key)) == true || event.key === "0") {
            whichCell.innerText = "";
        }
    }

    // Add a click function on each cell. Push the last selected cell into an array.
    $("td").click(selectedCell);
    let lastPressed = [];
    function selectedCell() {
        $(lastPressed[0]).removeClass("focused");
        lastPressed = [];
        lastPressed.push(this);
        $(lastPressed[0]).addClass("focused");
        disableMobile();
    }

    //  Disable mobile keyboard from popping up on selected screens.
    function disableMobile() {
        if (window.innerWidth < 1000 && $(lastPressed.text() === "")) {
            $(lastPressed).attr("contenteditable", "false");
            setTimeout(function () {
                $(lastPressed).attr("contenteditable", "true");
            }, 100);
        }
    }

    // Enter the pressed number on numpad into the last selected cell.
    $(".num").click(numPad);
    function numPad() {
        if ($(lastPressed[0]).attr("contenteditable") === "true") {
            lastPressed[0].innerText = this.innerText;
            lastSelectedNum = this.innerText;
            enteredValueCheck();
        }
    }

    // Start a new game which fills the grid with the pre-made template.
    $("button").click(newGame);
    function newGame() {
        $("td").text("");
        $("td").attr("contenteditable", "true");
        gridTemplate();
    }
    function gridTemplate() {
        for (i = 0; i < grid1.length; i++) {
            if (typeof grid1[i] === "number") {
                cellArray[i].innerText = grid1[i];
                $(cellArray[i]).attr("contenteditable", "false");
            }
        }
    }

    // Check entered value.
    function enteredValueCheck() {

        // Get cells in the same column.
        let sameColumn = [];
        let reduceToSameColumn = cellArray.indexOf(lastPressed[0]);
        if (reduceToSameColumn > 8) {
            let fitsHowMany = Math.floor(reduceToSameColumn / 9);
            reduceToSameColumn = reduceToSameColumn - (9 * fitsHowMany);
        }
        for (j = reduceToSameColumn; j < 81; j += 9) {
            sameColumn.push(cellArray[j]);
        }
        reduceToSameRow = cellArray.indexOf(sameColumn[0]);// Belongs to same row part
        let removeACell = sameColumn.indexOf(lastPressed[0]);
        sameColumn.splice(removeACell, 1);

        // Get cells in the same row.
        let sameRow = [];
        let firstRowIndex = cellArray.indexOf(lastPressed[0]) - reduceToSameRow;
        for (nineTimes = 0; nineTimes < 9; nineTimes++) {
            if (nineTimes === reduceToSameRow) {
                continue;
            } else {
                sameRow.push(cellArray[firstRowIndex + nineTimes]);
            }
        }

        // Variables local to function.
        let savedLP = $(lastPressed[0]);
        let savedLP2 = lastPressed[0];
        let actualValue = grid1Solved[cellArray.indexOf(savedLP2)].toString();
        let savedCol = sameColumn;
        let savedRow = sameRow;

        // Executes if inputed cell is wrong in the loop below.
        function itsWrong(p1, i) {
            p1(i).attr("contenteditable", "false");
            p1(i).addClass("wrong");
            savedLP.addClass("wrong");
            setTimeout(function () {
                p1(i).removeClass("wrong");
                savedLP.removeClass("wrong");
                savedLP.text("");
                savedLP.attr("contenteditable", "true");
                disableMobile();
                lastPressed[0].focus();
            }, 600);
        }

        // If selected cell input is wrong, signal why and delete it.
        // Otherwise mark it as correct.
        for (i = 0; i < 8; i++) {
            function targetCol(i) {
                return $(savedCol[i]);
            }
            function targetRow(i) {
                return $(savedRow[i]);
            }
            if (targetCol(i).text() === savedLP.text()) {
                itsWrong(targetCol, i);
                break;
            } else if (targetRow(i).text() === savedLP.text()) {
                itsWrong(targetRow, i);
                break;
            } else if (savedLP.text() !== actualValue) {
                savedLP.addClass("wrong");
                setTimeout(function () {
                    savedLP.removeClass("wrong");
                    savedLP.text("");
                    savedLP.attr("contenteditable", "true");
                    disableMobile();
                    lastPressed[0].focus();
                }, 600);
            } else if (i === 7) {
                savedLP.attr("contenteditable", "false");
                savedLP.addClass("correct");
                setTimeout(function () {
                    savedLP.removeClass("correct");
                }, 600);
            }
        }
    };
});
