/**  Function Should:
 * Run whenever a facilitator choose to move the game forward
 * Update the game state in the database
 * Emit an event to the specific client(s) to let them know it has been updated
*/

const pool = require('../../modules/pool');

//the structure for what a advance action will look like from the client
const sampleAdvanceAction = {
    type: 'advance',
    data: {
        newGameState: 00,
    },
    facilitatorId: 0,
}

const advance =  async (action, gameId, socket) => {
    try {
        //update the database to reflect the new game state
        const gameStage = await pool.query(`UPDATE "game_state" SET "game_stage"=$1 WHERE "game_id"=$2;`, 
            [action.data.newGameState, gameId]);
        //send the action to all other users
        socket.emit('moves', {...action});
        socket.broadcast.emit('moves', {...action});
    }
    catch (err) {
        console.log('Error in advance handler', err);
    }
}


module.exports = advance;