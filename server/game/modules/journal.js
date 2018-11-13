/**  Function Should:
 * Run whenever a user submits data to be saved in their journal
 * Insert the new answer into the table based on the provided round 
 * Emit an event to the specific client(s) to let them know it has been updated
*/

const pool = require('../../modules/pool');

//the structure for what a journal action will look like from the client
const sampleJournalAction = {
    type: 'journal',
    intention: 'true', //or false
    data: {
        playerId: '',
        question: '',
        response: '',
        roundNumber: 'one',
    },
    //or
    data: {
        playerId: '',
        intention: '',
    }
}

const journal = async (action, gameId, socket) => {
    console.log(action);
    try {
        let journalId = await pool.query(`SELECT * FROM "player" WHERE "id"=$1;`, [action.data.playerId]);
        journalId = journalId.rows[0].journal_id;
        if(action.intention){
            await pool.query('UPDATE "journal" SET "intention"=$1 WHERE "id"=$2;', [action.data.intention, journalId])
        }
        else {
            let query;
            switch (action.data.roundNumber) {
                case '1':
                    query = `UPDATE "journal" set "question_one"=$1, "response_one"=$2 WHERE "id"=$3;`
                    break;
                case '2':
                    query = `UPDATE "journal" set "question_two"=$1, "response_two"=$2 WHERE "id"=$3;`
                    break;
                case '3':
                    query = `UPDATE "journal" set "question_three"=$1, "response_three"=$2 WHERE "id"=$3;`
                    break;
                case '4':
                    query = `UPDATE "journal" set "question_four"=$1, "response_four"=$2 WHERE "id"=$3;`
                    break;
                case '5':
                    query = `UPDATE "journal" set "question_five"=$1, "response_five"=$2 WHERE "id"=$3;`
                    break;
            }
            await pool.query(query, [action.data.question, action.data.response, journalId]);
        }
        socket.emit('moves', { ...action });
    }
    catch (err) {
        console.log('Error in journal handler', err);
    }
}


module.exports = journal;