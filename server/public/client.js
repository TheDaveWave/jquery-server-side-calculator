/// <reference path="jQuery.js" />

$(readyNow);

function readyNow () {
    // initialization
    grabAnswer();
    grabHistory();

    // event handlers
    $('.operator').on('click', getOperation);
    $('.num').on('click', getKeypadPress);
    $('#equals').on('click', sendOperation);
    $('#clear').on('click', clear);
}

// store operator that was clicked.
let operator = '';
let num1 = 0;


// function to get the value of the button that was just clicked.
function getKeypadPress (event) {
    let num = $(event.target).text();
    // console.log(num);
    appendDisplay(num);
    return num;
}

// function to append the num class buttons values into the display.
function appendDisplay(num) {
    let display = $('#display');
    // add num to the display value and display it.
    display.val(`${display.val()}` +  `${num}`);
    // console.log(display.val());
}


// function to clear inputs and reset operator.
function clear() {
    operator = '';
    // console.log(operator);
    $('#display').val('');
    // resetResult();
}

// function to get the operator from the corresponding button.
// modified to get the value of display input.
function getOperation (event) {
    operator = $(event.target).text();
    num1 = $('#display').val();
    $('#display').val('');
    console.log(num1);
    console.log(operator);
}

// function to send mathematical operations to server.
// modified to use display input value as num2.
function sendOperation () {
    $.ajax({
        type: 'POST',
        url: '/math-operations',
        data: {
            num1: num1,
            num2: $('#display').val(),
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
    $('#display').val('');
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