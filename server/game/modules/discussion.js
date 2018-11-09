/**  Function Should:
 * Run whenever a discussion phase needs to be advanced by facilitator
 * Run a query on the database to update the boolean value of the speaker identified in the data
 * Emit an event to the client to signal success and refresh data.
*/

//the structure for what a discussion action will look like from the client
const sampleDiscussionAction = {
    type: 'discussion',
    data: {
        playerName: '',
    },
    facilitatorId: 0,
}

const discussion = (action, gameId, socket) => {
    
}


module.exports = discussion;