//function handles start of games
const start = require('./modules/start');

//function handles data sent from the clients
const receiver = require('./modules/receiver');

//function advances game state one stage
const advance = require('./modules/advance');

//function updates player journals
const journal = require('./modules/journal');

//function advances discussion phase
const discussion =  require('./modules/discussion');

//function handles end of games
const end = require('./modules/end');

const game = async facilitatorID => {
    try {
        await start(facilitatorID);
        //start socket here

    } 
    catch (err) {

    }
}

module.exports = game;