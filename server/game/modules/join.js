/**  Function Should:
 * Run whenever a facilitator choose to move the game forward
 * Update the game state in the database
 * Emit an event to the specific client(s) to let them know it has been updated
*/

const pool = require('../../modules/pool');

//the structure for what a join action will look like from the client
const sampleJoinAction = {
    type: 'join',
    data: {
        playerName: '',
    },
}

const join =  async (action, gameId, socket) => {
    try {
        //As each player joins create a journal row
        let journalId = await pool.query(`INSERT INTO "journal" ("game_id") VALUES ($1)
            RETURNING "id";`, [gameId]);
        journalId = journalId.rows[0].id;
        //create the player's row in the table
        let playerId = await pool.query(`INSERT INTO "player" ("name", "game_id", "journal_id", "in_game")
            VALUES ($1,$2,$3,$4) RETURNING "id";`, [action.data.playerName, gameId, journalId, true]);
        //send the player information back to the client
        playerId = playerId.rows[0].id;

        /* socket emissions */
        //set player that joined's redux state on client
        socket.emit('join', {...action, data: {id: playerId}, game: gameId });
        //tell all players to update their player record
        socket.broadcast.emit('players', {type: 'done'} )
        //tell inbound player to update their players record
        socket.emit('players', {type: 'done'} )
        //tell inbound player to update their game state
        socket.emit('moves', {
            type: 'advance',
            data: {
                newGameState: '00',
            },
        })
    }   
    catch (err) {
        console.log('Error in join handler', err);
    }
}


module.exports = join;

//may need a rejoin function as well