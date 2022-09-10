/// <reference path="jQuery.js" />

$(readyNow);

function readyNow () {
    // initialization
    grabAnswer();
    grabHistory();

    // event handlers
    $('.operator').on('click', getOperation);
    $('#equals').on('click', sendOperation);
    $('#clear').on('click', clear);
}

// store operator that was clicked.
let operator = '';

// function to clear inputs and reset operator.
function clear() {
    operator = '';
    // console.log(operator);
    $('#num1').val('');
    $('#num2').val('');

    // resetResult();
}

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
        grabAnswer();
        grabHistory();
        operator = '';
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

// function to GET the operation history and append to DOM.
function grabHistory () {
    $.ajax({
        type: 'GET',
        url: '/math-operations'
    }).then((response) => {
        appendHistory(response);
    }).catch((error) => {
        console.log(error);
    });
}

// function to append history to the DOM.
function appendHistory (response) {
    $('#history').empty();
    for (const operation of response) {
        $('#history').prepend(`
            <li>${operation}</li>
        `);
    }
}

// function to GET the result of the operation and append to DOM.
function grabAnswer () {
    $.ajax({
        type: 'GET',
        url: '/answer'
    }).then((response) => {
        // console.log(response);
        $('#result').text(response);
    }).catch((error) => {
        console.log(error);
    });
}

// function to reset server result to 0;
function resetResult () {
    $.ajax({
        type: 'DELETE',
        url: '/answer'
    }).then((response) => {
        $('#result').text(response);
    }).catch((error) => {
        console.log(error);
    });
}