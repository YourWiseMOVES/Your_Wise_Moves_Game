/**  Function Should:
 * Run when a facilitator clicks a start game button
 * Generate a unique code for the game
 * Insert row into game table
 * Create discussion phase and game state rows
*/
const pool = require('../../modules/pool');
const newCode = require('randomatic');

const start = async (facilitatorId, name) => {
    try {
        //use module to generate new six digit numerical code
        let code = await newCode('0', 6);
        //create new game row, get the id back from db
        let gameId = await pool.query(`INSERT INTO "game" ("facilitator_id", "name", "code")
            VALUES ($1,$2,$3) RETURNING "id";`, [facilitatorId, name, code]);
        gameId = gameId.rows[0].id
        //create new game state row using game id
        pool.query(`INSERT INTO "game_state" ("game_id")
            VALUES ($1);`, [gameId]);
        //send the data back to the game function
        return {
            gameId,
            code,
        };
    }
    catch (err) {
        console.log('Error starting game', err);
    }
}

module.exports = start;