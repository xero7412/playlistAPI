let count = 0;

const getElementById = (id, elementList) => {
    return elementList.find((element) => {
      return element.id === Number(id);
    });
};

const getIndexById = (id, elementList) => {
        return elementList.findIndex((element) => {
        return element.id === Number(id);
    });
};

const addSong = (queryArguments) => {
    let currentId;
    count += 1;
    currentId = count;
    return {
    'id':    currentId,
    'song':  queryArguments.song,
    };
};

const songs = (arr) => {
    arr.push(addSong({'song': 'numb'}));
    arr.push(addSong({'song': 'in the end'}));
    arr.push(addSong({'song': 'papercut'}));
}; 

module.exports = {
    addSong: addSong,
    getIndexById: getIndexById,
    getElementById: getElementById,
    
    songs: songs,
};