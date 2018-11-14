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
        //get cards
       let cardResponse  = await pool.query(`SELECT * FROM "card";`)
       //get players
       let playerResponse = await pool.query(`SELECT "id" FROM "player" WHERE "game_id"=$1;`, [gameId])
       //set cards as card data
       let cards = cardResponse.rows;
       //set players as players data
       let players = playerResponse.rows;
       //create a deck object with Deck class
       let deck =  new Deck(cards);
       //set selected deck by round number
       deck.subSelect(Number(action.data.roundNumber));
       for (let player of players) {
           let draw = deck.draw(); //draw a card
           //set the players card in the database
           pool.query(`UPDATE "player" SET "current_card"=$1 WHERE "id"=$2;`, [draw.text, player.id])
           deck.shuffle(); //shuffle the deck (for fun)
       }
       //emit players event to trigger client player updates
       socket.emit('players', {type: 'done'});
       socket.broadcast.emit('players', {type: 'done'})
       socket.broadcast.emit('moves', {type: 'updatePlayer'})
    }   
    catch (err) {
        console.log('Error in deal handler', err);
    }
}


module.exports = deal;