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
        //get the number (1-5) that a player will be assigned for the discussion phase purposes
        const playerNumber = await pool.query(`SELECT "player_number" from "game" WHERE "game_id"=$1;`, [gameId]);
        //increment the player number by one
        let next = playerNumber + 1;
        //update the game table so that the next player's number will be the next number
        await pool.query(`UPDATE "game" SET "player_number"=$1 WHERE "game_id"=$2;`, [next, gameId]);
        //As each player joins create a journal row
        const journalId = await pool.query(`INSERT INTO "journal" ("game_id") VALUES ($1)
            RETURNING "id";`, [gameId]);
        //create the player's row in the table
        const playerId = await pool.query(`INSERT INTO "player" ("name", "game_id", "journal_id", "player_number")
            VALUES ($1,$2,$3,$4) RETURNING "id";`, [action.data.playerName, gameId, journalId, playerNumber]);
        //send the player information back to the client
        socket.emit('join', {...action, data: {playerId, playerNumber} });
    }   
    catch (err) {
        console.log('Error in join handler', err);
    }
}


module.exports = join;

//may need a rejoin function as well