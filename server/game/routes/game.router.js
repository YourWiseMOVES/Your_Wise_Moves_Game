//routes to start, end game 
const router = require('express').Router();
const game = require('../game');

router.post('/start', async (req, res) => {
    const code = await game.begin(req.body.id, req.io);
    res.send(code);
})

router.post('/end', (req, res) => {
    game.end(req.body.id, req.io)
    .then(() => res.sendStatus(200));
})
    

module.exports = router;