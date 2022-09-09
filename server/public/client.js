/// <reference path="jQuery.js" />

$(readyNow);

function readyNow () {
    $('.operator').on('click', getOperation);
    $('#equals').on('click', sendOperation);
}

// store operator that was clicked.
let operator = '';

// function to get the operator from the corresponding button.
function getOperation (event) {
    operator = $(event.target).text();
    console.log(operator);
}

// function to send mathematical operations to server.
function sendOperation () {
    $.ajax({
        type: 'POST',
        url: '/math-operations',
        data: {
            num1: $('#num1').val(),
            num2: $('#num2').val(),
            operator: operator
        }
    }).then((response) => {
        
    }).catch((error) => {
        console.log(error);
        if(error.status === 400) {
            alert('Fill inputs and select operator.');
        }
    });

    // empty inputs
    $('#num1').val('');
    $('#num2').val('');
}