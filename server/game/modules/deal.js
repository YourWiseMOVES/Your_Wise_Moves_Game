/**  Function Should:
 * run whenever a deal action comes into the receiver
 * create a deck based on the deck parameters
 * deal a card to each player
 * -->get a random card from the deck
 * -->shuffle the deck (for fun)
 * -->assign that card to the player by updating the player table
 * -->repeat for all players
 * emit socket events to update the client(s)
*/

//the structure for what a deal action will look like from the client
const sampleDealAction = {
    type: 'deal',
    data: {
       roundNumber: '1', //round number as a string from client redux state
    },
    facilitatorId: 0,
}


//Deck class contains all methods required for dealing 
const Deck = require('./Deck');
const pool = require('../../modules/pool');

const deal =  async (action, gameId, socket) => {
    try {
       
    }   
    catch (err) {
        console.log('Error in deal handler', err);
    }
}


module.exports = deal;