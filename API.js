const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 4001;
app.use(express.static('public'));
app.use(bodyParser.json());

const { getId, addSong } = require('./APIfunc');

//stored songs
let songs = {
    1 : {"song" : "in the end"},
    2 : {"song" : "numb"},
    3 : {"song" : "papercut"}
};

//get all songs
app.get('/songs', (req, res) => {
     res.send(songs);
});

//get a single song by  id
app.get('/songs/:id', (req, res) => {
    const foundSong = getId(req.params.id, songs);
    if (foundSong) {
        res.send(songs[req.params.id]);
    } else {
        res.status(404).send('song does not exist');
    }
});

//add song to the list 
app.post('/songs/:song', (req, res) => {
    const newSong = addSong(req.params.song, songs);
    if (newSong) {
        res.status(201).send(newSong);
    } else {
        res.status(400).send('cannot create');
    }
});

//update a song
app.put('/songs/:id/:song', (req, res) => {
    let getIndex = getId(req.params.id, songs);
    if (getIndex) {
        songs[req.params.id] = {"song" : req.params.song};
        res.send(songs);
    }
    else {
        res.status(404).send('song does not exist');
    } 
});

//delete a song by id 
app.delete('/songs/:id', (req, res) => {
    const newidx = getId(req.params.id, songs);
    if (newidx) {
        delete(songs[req.params.id]);
        res.status(204).send('deleted');
    } else {
        res.status(404).send('song does not exist');
    }
});

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});