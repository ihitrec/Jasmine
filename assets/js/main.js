$(function () {
    // Enable input on all table cells
    $("td").attr("contenteditable", "true");

    // Add a key up function on each cell, if entered key is a number, keep it. Otherwise delete it.
    $("td").keyup(isNum);

    function isNum(event) {
        console.log(event.path);
        let whichCell = event.originalEvent.path[0];
        if (Number.isNaN(parseInt(event.key)) == false && event.key !== "0") {
            let numKey = event.key;
            whichCell.innerText = numKey;
        } else if (Number.isNaN(parseInt(event.key)) == true || event.key === "0") {
            whichCell.innerText = "";
        }
    }

    //  Disables phone keyboard from popping up
    function disableMobile() {
        setTimeout(function () {
            $("td").attr("contenteditable", "false");
            $("td").attr("contenteditable", "true");
        });
    }

    // Add a click function on each cell. Push the last selected cell into an array. 
    // Call disableMobile on selected screens.


    $("td").click(selectedCell);


    let lastPressed = [];
    function selectedCell(event) {
        console.log(event.currentTarget.cellIndex);
        lastPressed = [];
        console.log(lastPressed);

        lastPressed.push(event.originalEvent.path[0]);
        console.log(lastPressed);

        if (window.innerWidth < 1000) {
            disableMobile();
        }
    }

    // Enter the pressed number on numpad into the last selected cell


    $(".num").click(numPad);
    function numPad(event) {
        console.log(event);
        console.log(lastPressed);
        lastPressed[0].innerText = event.originalEvent.path[0].innerText;
    }


});

