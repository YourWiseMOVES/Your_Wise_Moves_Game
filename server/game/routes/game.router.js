//routes to start, end game 
const router = require('express').Router();
const game = require('../game');
const pool = require('../../modules/pool');

// later requires for email router
// const transporter = require('../../modules/transporter');
// const mailOptions = require('../../modules/mailOptions');

//post route (will require facilitator auth) to start game
router.post('/start', async (req, res) => {
    const data = await game.begin(req.body.id, req.io);
    res.send(data);
})


//get route for players in a specific game, no auth required
router.get('/players', (req, res) => {
    pool.query(`SELECT * FROM "player" WHERE "game_id"=$1;`, [req.query.id])
    .then(results => {
        res.send(results.rows);
    })
    .catch(err => {
        console.log('Error in players get', err);
    })
})

//post route for getting results emailed after the game 
router.post('/get/results', (req, res) => {
    //send results to player
})

//post route (will require facilitator auth) to end game
router.post('/end', (req, res) => {
    game.end(req.body.id, req.io)
    .then(() => res.sendStatus(200));
})
    

module.exports = router;