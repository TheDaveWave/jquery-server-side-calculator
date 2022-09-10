// store functions to be run on server.
module.exports = {calculate, operationToString, convertReq};

// perform calculations based on operator passed in.
function calculate (operation) {
    // console.log(operation);
    let op = operation;
    // console.log(op.operator);
    let result = 0;
    switch(op.operator) {
        case '+':
            result = op.num1 + op.num2;
            break;
        case '-':
            result = op.num1 - op.num2;
            break;
        case '*':
            result = op.num1 * op.num2;
            break;
        case '/':
            result = op.num1 / op.num2;
            break;
        default:
            console.log('Does not compute.');
    }
    console.log(result);
    return result;
}

// convert successful operation into a string.
function operationToString (operation, result) {
    let op = operation;
    return `${op.num1} ${op.operator} ${op.num2} = ${result}`; 
}

// convert the request object into a new object.
// primarily for readability. 
function convertReq (req) {
    let obj = {
        num1: Number(req.body.num1),
        num2: Number(req.body.num2),
        operator: req.body.operator
    }
    return obj;
}