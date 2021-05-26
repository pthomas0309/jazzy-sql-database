const express = require('express');
const router = express.Router();
//pg config (local only)
const pg = require('pg');
const Pool = pg.Pool;
const pool = new Pool({
    database: 'jazzy_sql',
    host: 'localhost',
    port: '5432'
});

// log connection
pool.on('connect', () => {
    console.log('CONNECTED TO POSTGRES');
});
//check for error
pool.on('error', (error) => {
    console.log(error);
});

// GET && POST
router.get('/artists', (req, res) => {
    console.log(`In /songs GET`);
    // GET from artist database
    let queryText = `SELECT * FROM "artists" ORDER BY "year_born" DESC;`
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

router.post('/artists', (req, res) => {
    //artistList.push(req.body);
    //sanitize query
    let queryText = `INSERT INTO "artists" ("artist_name", "year_born")
    VALUES ($1, $2);`
    console.log(req.body.artist);
    let values = [req.body.name, req.body.birthdate]
    //send query and an array with untrusted data to prevent injection
    pool.query(queryText, values)
    .then((result) => {
        res.sendStatus(201)
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

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