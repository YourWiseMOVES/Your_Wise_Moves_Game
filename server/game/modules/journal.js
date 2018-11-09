/**  Function Should:
 * Run whenever a user submits data to be saved in their journal
 * Insert the new answer into the table based on the provided round 
 * Emit an event to the specific client(s) to let them know it has been updated
*/

const pool = require('../../modules/pool');

//the structure for what a journal action will look like from the client
const sampleJournalAction = {
    type: 'journal',
    data: {
        playerName: '',
        questionId: '',
        response: '',
        roundNumber: 'one',
    }
}

const journal =  async (action, gameId, socket) => {
    try {
        await pool.query(`UPDATE "journal" set "question_${action.data.roundNumber}"=$1 
            AND "response_${action.data.roundNumber}"=$2;`, [action.data.questionId, action.data.response]);
        socket.emit('moves', {...action, data: {done: true}});
    }
    catch (err) {
        console.log('Error in journal handler', err);
    }
}


module.exports = journal;