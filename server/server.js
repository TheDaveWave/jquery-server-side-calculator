// import express.
const express = require('express');
const app = express();
// set a port to host local server.
const PORT = 5000;


app.use(express.static('server/public'));
// enable requests?
app.use(express.urlencoded({extended : true}));


// Global variables
// set variable equal to an array that will store the history
// of math operations.
let mathOperations = [];


// Posts and Gets

// GET to send the math operations history.
app.get('/math-operations', (req, res) => {
    res.send(mathOperations);
});

// POST to recieve desired math operations.
app.post('/math-operations', (req, res) => {
    mathOperations.push(req.body);
    console.log('Incoming payload /math-operations', req.body);
    res.status(201).send('operation received');
});


// the /answer to life = 42
// GET to send the result of the computation.
app.get('/answer', (req, res) => {

});

// local port to liston on.
app.listen(PORT, () => {
    console.log('Listening on port', PORT);
});