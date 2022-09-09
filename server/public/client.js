/// <reference path="jQuery.js" />
$(readyNow);

function readyNow () {
    $('.operator').on('click', getOperation);
}

// store operator into variable
let operation = {};

// function to get the operator from the corresponding button.
function getOperation (event) {
    operation.num1 = $('#num1').val();
    operation.num2 = $('#num2').val();
    operation.operator = $(event.target).text();
    console.log(operation);

    // empty inputs
    $('#num1').val('');
    $('#num2').val('');
}

// function to send mathmatical operations to server.
