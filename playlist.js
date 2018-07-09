const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 4001;
app.use(express.static('public'));
app.use(bodyParser.json());

const { getElementById, getIndexById, updateSong, songs, addSong } = require('./functions');

let songList = [];
songs(songList);

// Get all songs
app.get('/songs', (req, res) => {
    res.send(songList);
});

// Get a single song by id
app.get('/songs/:id', (req, res) => {
    const foundSong = getElementById(req.params.id, songList);
    if (foundSong) {
      res.send(foundSong);
    } else {
      res.status(404).send();
    }
});

// Update a song by id 
app.put('/songs/:id/:song', (req, res) => {
    const songIndex = getIndexById(req.params.id, songList);
    if (songIndex !== -1) {
     const updateSong = ({...songList[songIndex], 'song': req.params.song});
     const updatedSong = [
      ...songList.slice(0, songIndex),
      updateSong,
      ...songList.slice(songIndex + 1),
    ];
    res.send(updatedSong);
    } else {
      res.status(404).send('song does not exist');
    }
});

// add song to the list
app.post('/songs/:song', (req, res) => {
    const receivedExpression = addSong({'song': req.params.song});
    if (receivedExpression) {
      songList.push(receivedExpression);
      res.status(201).send(receivedExpression);
    } else {
      res.status(400).send('cannot create');
    }
});

// Delete a song
app.delete('/songs/:id', (req, res) => {
    const expressionIndex = getIndexById(req.params.id, songList);
    if (expressionIndex !== -1) {
      songList.splice(expressionIndex, 1);
      res.status(204).send();
    } else {
      res.status(404).send();
    }
  });

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});