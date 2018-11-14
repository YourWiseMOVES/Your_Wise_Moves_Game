const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


// GET info on all questions from the card table
router.get('/', (req, res) => {
    console.log('get card');
    pool.query(`SELECT * FROM "decks";`)
        .then((results) => {
            res.send(results.rows)
        }).catch((error) => {
            console.log('Error GET /decks', error);
            res.sendStatus(500);
        })
});
router.get('/deckcards', (req, res) => {
    console.log('get card');
    let initailArray=[1,2,4,5,6,7,8,]
    let queryArray = initailArray.join(', ')
    pool.query(`SELECT * FROM "card"
                WHERE "id" in(${queryArray});`)
        .then((results) => {
            res.send(results.rows)
        }).catch((error) => {
            console.log('Error GET /decks', error);
            res.sendStatus(500);
        })
});


// POST for adding a new question to the card table in the database
router.post('/', (req, res) => {
    let query = pool.query(`INSERT INTO "decks"( "cards_in_deck","description" )
    VALUES (ARRAY [${req.body.cards_in_deck}], $1);`,
        [req.body.description])
    console.log(query)
    query.then((results) => {
        res.sendStatus(200)
    }).catch((error) => {
        console.log('Error with server-side POST:', error);
        res.sendStatus(500);
    })
});


// DELETE question from card database
router.delete('/:id', (req, res) => {
    pool.query(`DELETE FROM "decks"
    WHERE "id"=$1;`,
        [req.params.id])
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
    "stage_id" = $2
    WHERE "id" = $3`,
        [req.body.text,
        req.body.stage_id,
        req.body.id])
        .then((results) => {
            res.send(200)
        }).catch((error) => {
            console.log('Error with server-side PUT:', error);
            res.send(500);
        })
})

module.exports = router;