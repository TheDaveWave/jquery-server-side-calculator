// import express.
const express = require('express');
const app = express();
// set a port to host local server.
const PORT = 5000;


app.use(express.static('server/public'));
// enable requests?
app.use(express.urlencoded({extended : true}));






// local port to liston on.
app.listen(PORT, () => {
    console.log('Listening on port', PORT);
});