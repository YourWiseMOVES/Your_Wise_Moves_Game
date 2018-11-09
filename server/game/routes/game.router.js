//routes to start, end game 
const router = require('express').Router();
const game = require('../game');

router.post('/start', (req, res) => {
    game.start(req.user.id);
})

router.post('/end', (req, res) => {
    game.end(req.user.id);
})

module.exports = router;