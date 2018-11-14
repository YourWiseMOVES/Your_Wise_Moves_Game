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
        player: {},
        set: 'next', //or 'done'
    },
    facilitatorId: 0,
}

const discussion = async (action, gameId, socket) => {

    //update player to reflect that they have spoken their turn in the discussion phase
    if (action.data.set === 'done') {
        try {
            //update the player to reflect that they have spoken
            await pool.query(`UPDATE "player" SET "discussed"=$1 WHERE "id"=$2;`, [true, action.data.player.id]);
            //let all the clients know that this player has spoken
            socket.emit('players', {type: 'done'});
            socket.broadcast.emit('players', {type: 'done'})
        }
        catch (err) {
            console.log('Error in discussion handler', err);
        }
    }
    //update all clients on which player is selected to speak
    if (action.data.set === 'next') {
        try {
            //let all the clients know that this player is selected
            socket.emit('moves', {type: 'discussion', data: {
                player: action.data.player,
            }});
            socket.broadcast.emit('moves', {type: 'discussion', data: {
                player: action.data.player,
            }});
        }
        catch (err) {
            console.log('Error in discussion handler', err);
        }
    }
   
}


module.exports = discussion;