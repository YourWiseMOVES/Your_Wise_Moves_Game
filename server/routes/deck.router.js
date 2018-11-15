const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


// GET a list of all decks
router.get('/', (req, res) => {
    console.log('get all decks');
    pool.query(`SELECT * FROM "deck";`)
        .then((results) => {
            res.send(results.rows)
        }).catch((error) => {
            console.log('Error GET /deck', error);
            res.sendStatus(500);
        })
});
// GET all the cards in a given deck
router.get('/cards', (req, res) => {
    console.log('get card');
    pool.query(`SELECT * FROM "card"
    WHERE "id" 
    IN (SELECT unnest("cards_in_deck") FROM "deck" WHERE "id" = $1);`, [req.query.id])
        .then((results) => {
            res.send(results.rows)
        }).catch((error) => {
            console.log('Error GET /deck', error);
            res.sendStatus(500);
        })
});


// POST a new deck, takes an array of cards that make up the deck, and the description of the deck
router.post('/', (req, res) => {
    let query = pool.query(`INSERT INTO "deck"( "cards_in_deck","description" )
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


// DELETE a whole deck
router.delete('/:id', (req, res) => {
    pool.query(`DELETE FROM "deck"
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
    console.log('in the edit function');
    console.log(req.body);
    pool.query(`UPDATE "deck"
    SET "cards_in_deck" = ARRAY [${req.body.cards_in_deck}],
    "description" = $1
    WHERE "id" = $2`,
        [req.body.description,
        req.body.id])
        .then((results) => {
            res.sendStatus(200)
        }).catch((error) => {
            console.log('Error with server-side PUT:', error);
            res.sendStatus(500);
        })
})

module.exports = router;