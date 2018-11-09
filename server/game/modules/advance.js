/**  Function Should:
 * Run whenever a facilitator choose to move the game forward
 * Update the game state in the database
 * Emit an event to the specific client(s) to let them know it has been updated
*/

//the structure for what a advance action will look like from the client
const sampleAdvanceAction = {
    type: 'advance',
    data: {
        newGameState: 00,
    },
    facilitatorId: 0,
}

const advance =  (action, gameId, socket) => {
    
}


module.exports = advance;