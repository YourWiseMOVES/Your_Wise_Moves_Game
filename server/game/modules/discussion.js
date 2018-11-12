/**  Function Should:
 * Run whenever a discussion phase needs to be advanced by facilitator
 * Run a query on the database to update the boolean value of the speaker identified in the data
 * Emit an event to the client to signal success and refresh data.
*/

const pool = require('../../modules/pool');

//the structure for what a discussion action will look like from the client
const sampleDiscussionAction = {
    type: 'discussion',
    data: {
        playerNumber: 0,
        setTo: true,
    },
    facilitatorId: 0,
}

const discussion = async (action, gameId, socket) => {
    try {
        //update the player to reflect that they have spoken
        await pool.query(`UPDATE "discussion_phase" SET "player_${action.data.playerNumber}"=$1'`, [action.data.setTo]);
        //let all the clients know that this player has spoken
        socket.emit('moves', action);
    }
    catch (err) {
        console.log('Error in discussion handler', err);
    }
}


module.exports = discussion;