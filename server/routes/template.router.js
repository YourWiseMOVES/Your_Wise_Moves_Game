const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


// GET info on all questions from the card table
router.get('/', (req, res) => {
    console.log('get card');
    pool.query(`SELECT * FROM "card";`)
        .then((results) => {
            res.send(results.rows)
        }).catch((error) => {
            console.log('Error GET /card', error);
            res.sendStatus(500);
        })
});


// POST for adding a new question to the card table in the database
router.post('/', (req, res) => {
    let body = req.body.card;
    pool.query(`INSERT INTO "card"( "text","stage_id" )
    VALUES ($1, $2);`,
        [body.text,
        body.stage_id])
        .then(( results) => {
            res.sendStatus(results.rows)
        }).catch((error) => {
            console.log('Error with server-side POST:', error);
            res.sendStatus(500);
        })
       // (1, E'Put moves into practice in this moment. Map where you are, Open and breathe and listen to connect with emotions, feel your heart\'s desire and ask for clarity, Visualize what you really want, identify your next step to Engage it.', 5, TRUE),)
});


// DELETE question from card database
router.delete('/', (req, res) => {
    pool.query(`DELETE FROM "card"
    WHERE "test"=$1 AND "stage_id"=$2;`,
    [req.body.text,
    req.body.stage_id])
    .then((results) => {
        res.sendStatus(200)
    }).catch((error) => {
        console.log('Error with server-side DELETE:', error);
        res.sendStatus(500);
    })
});

// PUT to edit a question
router.put('/', (req, res) => {
    const updatedCard = req.body;
    console.log('in the edit function');
    console.log(req.body);
    pool.query(`UPDATE card
    SET "text" = $1,
    "stage_id" = $2,
    WHERE "id"=$3`,
    [req.body.text,
    req.body.stage_id])
    .then((results) => {
        res.send(200)
    }).catch((error) => {
        console.log('Error with server-side PUT:', error);
        res.send(500);
    })
})

module.exports = router;