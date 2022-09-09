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



// local port to liston on.
app.listen(PORT, () => {
    console.log('Listening on port', PORT);
});