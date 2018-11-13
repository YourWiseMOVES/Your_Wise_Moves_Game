//routes to start, end game 
const router = require('express').Router();
const game = require('../game');
const pool = require('../../modules/pool');

router.post('/start', async (req, res) => {
    const data = await game.begin(req.body.id, req.io);
    res.send(data);
})

router.get('/players', (req, res) => {
    pool.query(`SELECT * FROM "player" WHERE "game_id"=$1;`, [req.query.id])
    .then(results => {
        res.send(results.rows);
    })
    .catch(err => {
        console.log('Error in players get', err);
    })
})

router.post('/end', (req, res) => {
    game.end(req.body.id, req.io)
    .then(() => res.sendStatus(200));
})
    

module.exports = router;