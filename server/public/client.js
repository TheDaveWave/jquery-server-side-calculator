/// <reference path="jQuery.js" />


$(readyNow);

function readyNow () {
    // initialization
    grabAnswer();
    grabHistory();
    // console.log($('#display').val());
    // console.log($('#display').text());

    // event handlers
    $('.operator').on('click', getOperation);
    $('.num').on('click', getKeypadPress);
    $('#equals').on('click', sendOperation);
    $('#clear').on('click', clear);
    $('#empty-history').on('click', resetHistory);
}

// store operator that was clicked.
let operator = '';
let num1 = 0;
let check = false;

// function to get the value of the button that was just clicked.
function getKeypadPress (event) {
    let num = $(event.target).text();
    $('#clear').text('C');
    if(num !== '0' && num !== '.') {
        // console.log(check, 'first check in key');
        appendDisplay(num);
    } else if (num === '.') {
        // console.log(num, 'should be .');
        check = true;
        // console.log(check, 'second check in key');
        appendDisplay(num);
    } else if ($('#display').val() !== '0') {
        // console.log(check, 'third check in key');
        appendDisplay(num);
    }
    // console.log(num);
    return num;
}

// function to append the num class buttons values into the display.
function appendDisplay(num) {
    let display = $('#display');
    // if check is false empty display.
    // console.log(check);
    if(check === false) {
        display.val('');
    } 
    // add num to the display value and display it.
    display.val(`${display.val()}` + `${num}`);
    // console.log(display.val());
    check = true;
    // console.log(check);
}

// function to get the operator from the corresponding button.
// modified to get the value of display input.
function getOperation (event) {
    let display = $('#display');

    operator = $(event.target).text();
    num1 = $('#display').val();

    display.val(`${display.val()}` + `${operator}`);

    // clear the display
    // $('#display').val('');

    console.log(num1);
    console.log(operator);
}


// function to clear inputs and reset operator.
function clear() {
    operator = '';
    let clr = $('#clear');
    if(clr.text() === 'AC'){
        resetHistory();
    }
    // console.log(operator);
    resetResult();
    clr.text('AC');
}

// function to send mathematical operations to server.
// modified to use display input value as num2.
function sendOperation () {
    let num2 = $('#display').val();
    num2 = num2.substring(num2.indexOf(operator) + 1);
    $.ajax({
        type: 'POST',
        url: '/math-operations',
        data: {
            num1: num1,
            num2: num2,
            operator: operator
        }
    }).then((response) => {
        grabAnswer();
        grabHistory();
        operator = '';
        // rest input display
        $('#display').val('');
        // console.log($('#display').val());
        check = false;
    }).catch((error) => {
        console.log(error);
        if(error.status === 400) {
            alert('Fill inputs and select operator.');
        }
    });
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
        if(response === '42') {
            alert(`You calculated the meaning of life: ${response}`);
        }
        // $('#result').text(response);
        $('#display').val(response);
        check = false;
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
        // $('#result').text(response);
        $('#display').val(response);
        // console.log($('#display').val());
        check = false;
    }).catch((error) => {
        console.log(error);
    });
}

// function to DELETE server math operations history.
function resetHistory () {
    $.ajax({
        type: 'DELETE',
        url: '/math-operations'
    }).then((response) => {
        appendHistory(response);
        // $('#clear').text('C');
    }).catch((error) => {
        console.log(error);
    });
}