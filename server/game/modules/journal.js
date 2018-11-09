/**  Function Should:
 * Run whenever a user submits data to be saved in their journal
 * Insert the new answer into the table based on the provided round 
 * Emit an event to the specific client(s) to let them know it has been updated
*/

//the structure for what a journal action will look like from the client
const sampleJournalAction = {
    type: 'journal',
    data: {
        playerName: '',
        questionId: 0,
        response: '',
    }
}

const journal =  (action, gameId, socket) => {
    
}


module.exports = journal;