/**  Function Should:
 * Run on game ending by facilitator
 * should store this game's results in a separate temporary results table
 * schedule an action to clear that table in however long
 * clear all data with cascading delete
 * close socket connections after all users have responded to the results prompt
*/

const pool = require('../../modules/pool');

const end = async (socket, gameId, link, io, code) => {
    try {
        //store this game's results in a separate temporary results table
            //player id, player name, intention, all qs and as
        let playerResponse = await pool.query('SELECT * FROM "player" WHERE "game_id"=$1;', [gameId]);
        let players = playerResponse.rows;
        for (let player of players) { //insert a results row for each player
            let journalResponse = await pool.query('SELECT * FROM "journal" WHERE "id"=$1;', [player.journal_id])
            journal = journalResponse.rows[0];
            pool.query(`INSERT INTO "result"
            ("player_id", "intention", "question_one", "response_one", "question_two", "response_two",
            "question_three", "response_three", "question_four", "response_four", "question_five", "response_five"
            )
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12);
            `, [player.id, player.intention, journal.question_one, journal.response_one, journal.question_two, journal.response_two,
                journal.question_three, journal.response_three, journal.question_four, journal.response_four, journal.question_five, journal.response_five
            ])
        }

        //schedule an action to clear that table in however long
        
        
        //cascading delete on all temporary game data
        await pool.query(`DELETE FROM "game" WHERE "id"=$1;`, [gameId]);

        //end the socket connection
        try {
            const connectedNameSpaceSockets = Object.keys(link.connected); // Get Object with Connected SocketIds as properties
            connectedNameSpaceSockets.forEach(socketId => {
                link.connected[socketId].disconnect(); // Disconnect Each socket
            });
            link.removeAllListeners(); // Remove all Listeners for the event emitter
            delete io.nsps[`/${code}`]; //delete the namespace
        }
        catch (err) {
            console.log('Error disconnection sockets', err);
        }
    }
    catch (err) {
        console.log('Error ending game', err);
    }
    console.log('Game ended successfully');
}


module.exports = end;