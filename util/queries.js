const Room = require("../models/room");
const deckController = require('../controllers/deck');


exports.findRoom = (id) => {
    return Room.findById(id).populate("users").exec()
}

exports.findRooms = (roomName) => {
    return Room.find({roomName: roomName})
}

exports.findRoomsWithSocket = (socket_id) => {
    return Room.find({sockets: socket_id})
}

exports.createRoom = (room_data, socket_id) => {

    let author = {
		id: room_data.userID,
		userName: room_data.userName
    }
    
    let users = [];
    users.push(room_data.userID);

    let sockets = [];
    sockets.push(socket_id);

    let decks = deckController.resetDecks();
    let boardmatrix = deckController.setupBoardMatrix();

    return Room.create ({
        roomName: room_data.roomName
        ,password: room_data.password
        ,author: author
        ,users: users
        ,sockets: sockets
		
		,max_players: 2
		
        ,decks: decks
        ,matrix: boardmatrix
    })
}

// exports.addRoomUser = async(room, userID) => {
//     room.users.push(userID)
//     await room.save()
// }


// exports.findRoom = (id) => {
//     Room.findById(id).populate("users").exec(function(err, room){
//         console.log(room)
//     })
// }