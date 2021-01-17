$("td").attr("contenteditable", "true");
$("td").attr("onkeyup", "myFunc()");
let numKey;
let whichCell;
function myFunc() {
    if (Number.isNaN(parseInt(this.event.key)) == false) {
        numKey = this.event.key;
        whichCell = this.event.path[0];
        logIt();
    }

}

function logIt() {
    whichCell.innerText = numKey;
    console.log(numKey);
    console.log(whichCell);
}

let cellArray = document.getElementsByTagName("td");

function pickACell() { return Math.floor(Math.random() * 81); }
let alreadyPickedCell = [];
function pickANumber() { return Math.floor(Math.random() * 9 + 1); }
function generateTemplate() {
    for (i = 0; i < 17; i++) {
        let pickedCell = pickACell();
        if (alreadyPickedCell.includes(pickedCell) === false) {
            console.log(pickedCell);
            cellArray[pickedCell].innerText = pickANumber();
            alreadyPickedCell.push(pickedCell);
        } else if (alreadyPickedCell.includes(pickedCell) === true) {
            i--;
        }

        console.log(alreadyPickedCell);
    }


}
generateTemplate();
