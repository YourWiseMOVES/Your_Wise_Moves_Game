/**  Function Should:
 * Run whenever a facilitator choose to move the game forward
 * Update the game state in the database
 * Emit an event to the specific client(s) to let them know it has been updated
*/

//the structure for what a join action will look like from the client
const sampleJoinAction = {
    type: 'join',
    data: {
        playerName: '',
    },
}

const join =  (action, gameId, socket) => {
    
}


module.exports = join;