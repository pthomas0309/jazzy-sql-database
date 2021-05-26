const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/songs', (req, res) => {
    console.log(`In /songs GET`);
    // GET from artist database
    let queryText = `SELECT * FROM "songs" ORDER BY "title";`
    // send the query to DB
    // make a promise
    pool.query(queryText)
        .then((result) => {
            console.log(result.rows);
            res.send(result.rows)
        }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
});

router.post('/songs', (req, res) => {
    //songList.push(req.body);
    //sanitize query
    let queryText = `INSERT INTO "songs" ("title", "length", "released")
    VALUES ($1, $2, $3);`
    console.log(req.body.title);
    let values = [req.body.title, req.body.length, req.body.released]
    //send query and an array with untrusted data to prevent injection
    pool.query(queryText, values)
    .then((result) => {
        res.sendStatus(201)
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

module.exports = router;