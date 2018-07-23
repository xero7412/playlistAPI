//stored songs
let songs = require('./songs.json');

let num = Object.keys(songs)[Object.keys(songs).length-1];
const addSong = (songName, list) => {
    num++;
    return (list[num] = {"song" : songName}); 
      
};

const getId = (id, elementList) => {
    return (elementList.hasOwnProperty([id]));
};

function finished (err) {
    console.log('done!');
};

module.exports = {
    addSong: addSong,
    getId: getId,
    finished: finished,
};