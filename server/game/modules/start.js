/**  Function Should:
 * Run when a facilitator clicks a start game button
 * Generate a unique code for the game
 * Insert row into game table
*/
const pool = require('../../modules/pool');
const newCode = require('randomatic');

const start = async facilitatorId => {
    try {
        //create new game row, get the id back from db
        const gameId = await pool.query(`INSERT INTO "games" ('facilitator_id')
        VALUES ($1) RETURNING "id";`, [facilitatorId]);
        //use module to generate new six digit numerical code
        const code = await newCode('0', 6);
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