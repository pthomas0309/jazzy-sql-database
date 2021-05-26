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
let songsRouter = require('./routes/song_router');
let artistsRouter = require('./routes/artist_router');
//add router here
app.use('/song', songsRouter);
app.use('/artist', artistsRouter);
