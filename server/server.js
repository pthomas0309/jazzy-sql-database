const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

app.listen(PORT, () => {
    console.log('listening on port', PORT)
});

// TODO - Replace static content with a database tables

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
app.get('/artist', (req, res) => {
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

app.post('/artist', (req, res) => {
    //artistList.push(req.body);
    //sanitize query
    let queryText = `INSERT INTO "artists" ("artist_name", "year_born")
    VALUES ($1, $2);`
    console.log(req.body.artist_name);
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

app.get('/song', (req, res) => {
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

app.post('/song', (req, res) => {
    songList.push(req.body);
    res.sendStatus(201);
});


