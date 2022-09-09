/// <reference path="jQuery.js" />
$(readyNow);

function readyNow () {
    $('button').on('click', getOperator);
}

// store operator into variable
let operator = '';

// function to get the operator from the corresponding button.
function getOperator (event) {
    operator = $(event.target).text()
    console.log(operator);
}
