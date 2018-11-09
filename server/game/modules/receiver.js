/**  Function Should:
 * Run whenever an event is received by the socket connection
 * Determine which function needs to process this request
 * Run the appropriate function with that data
 * Send an event to the client to update data and signal success
*/

//the basic structure for what an action will look like from the client
const basicAction = {
    type: '',
    data: {},
    facilitatorId: 0,
}

//function advances game state one stage
const advance = require('./modules/advance');

//function updates player journals
const journal = require('./modules/journal');

//function advances discussion phase
const discussion = require('./modules/discussion');


//function receives actions and routes them to their proper handlers
const receiver = (action, gameId, socket) => {
    switch(action.type) {
        case ('advance'):
            advance(action, gameId, socket);
        ;
        case ('discussion'):
            discussion(action, gameId, socket);
        ;
        case ('journal'):
            journal(action, gameId, socket);
        ;
    }
}

module.exports = receiver;