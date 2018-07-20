let num = 3;

const addSong = (songName, list) => {
    num++;
    return list[num] = {"song" : songName};  
};

const getId = (id, elementList) => {
return (elementList.hasOwnProperty([id]));       
};

module.exports = {
    addSong: addSong,
    getId: getId,
};
