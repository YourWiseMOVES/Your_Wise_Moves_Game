/**  Function Should:
 * Run whenever an event is received by the socket connection
 * Determine which function needs to process this request
 * Run the appropriate function with that data
 * Send an event to the client to update data and signal success
*/

//the structure for what an action will look like from the client
const sampleAction = {
    type: '',
    data: {
    },
    facilitatorId: 0,
}

//function advances game state one stage
const advance = require('./advance');

//function updates player journals
const journal = require('./journal');

//function advances discussion phase
const discussion = require('./discussion');

//function adds players to the game
const join = require('./join')

//function dispatches players results on game end
const dispatch = require('./dispatch');

//function deals cards to players
const deal = require('./deal');

//function receives actions and routes them to their proper handlers
const receiver = (action, gameId, socket) => {
    console.log('in receiver');
    switch(action.type) {
        case ('advance'):
            advance(action, gameId, socket);
            break;
        case ('discussion'):
            discussion(action, gameId, socket);
            break;
        case ('journal'):
            journal(action, gameId, socket);
            break;
        case ('join'):
            join(action, gameId, socket);
            break;
        case ('dispatch'):
            dispatch(action, gameId, socket);
            break;
        case('deal'):
            deal(action, gameId, socket)
            break;
    }
}

module.exports = receiver;