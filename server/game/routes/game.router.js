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

//get route for player in a specific game, no auth required
router.get('/player', (req, res) => {
    pool.query(`SELECT * FROM "player" WHERE "id"=$1;`, [req.query.id])
    .then(results => {
        res.send(results.rows[0]);
    })
    .catch(err => {
        console.log('Error in player get', err);
    })
})

//post route for getting results emailed after the game 
router.post('/get/results', async (req, res) => {
    //get results based on player id    
    let resultResponse = await pool.query(`SELECT * FROM "result" WHERE "player_id"=$1;`, [req.body.id])
    let response = resultResponse.rows[0];
    //will then pass the response and req.body.email into mailOptions
    //then dispatch the email with transporter module
    res.sendStatus(201);
})

//post route (will require facilitator auth) to end game
router.post('/end', (req, res) => {
    game.end(req.body.id, req.io)
    .then(() => res.sendStatus(200));
})
    

module.exports = router;