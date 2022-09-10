// import express.
const express = require('express');
const app = express();
// set a port to host local server.
const PORT = 5000;


app.use(express.static('server/public'));
app.use(express.urlencoded({extended : true}));

// import functions to be called in server.
const {calculate, operationToString, convertReq} = require('./modules/functions');

// Global variables
// set variable equal to an array that will store the history
// of math operations.
let mathOperations = [];
let result = 0;

// Posts and Gets

// GET to send the math operations history.
app.get('/math-operations', (req, res) => {
    res.send(mathOperations);
});

// POST to recieve desired math operations.
app.post('/math-operations', (req, res) => {
    let newData = req.body;
    // check if the data received is relevant.
    if(newData.num1 === '' || newData.num2 === '' || newData.operator === '') {
        res.status(400).send('Please select an operator and fill inputs.');
    } else {
        console.log('Incoming payload /math-operations', req.body);
        let operation = convertReq(req);
        // perform calculation.
        result = calculate(operation);
        // get operation as a string.
        // push operation to mathOperations array.
        mathOperations.push(operationToString(operation, result));
        res.status(201).send('operation received');
    }  
});


// the /answer to life = 42
// GET to send the result of the computation.
app.get('/answer', (req, res) => {
    res.send(`${result}`);
});

// DELTE request to reset result.
app.delete('/answer', (req, res) => {
    console.log('DELETE request /answer');
    // do not know if this is good practice:
    result = 0;
    res.send(`${result}`);
});

// local port to liston on.
app.listen(PORT, () => {
    console.log('Listening on port', PORT);
});