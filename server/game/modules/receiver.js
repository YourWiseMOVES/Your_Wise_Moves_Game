/**  Function Should:
 * Run whenever an event is received by the socket connection
 * Determine which function needs to process this request
 * Run the appropriate function with that data
 * Send an event to the client to update data and signal success
*/


//function advances game state one stage
const advance = require('./modules/advance');

//function updates player journals
const journal = require('./modules/journal');

//function advances discussion phase
const discussion = require('./modules/discussion');

const receiver = () => {
    
}

module.exports = receiver;