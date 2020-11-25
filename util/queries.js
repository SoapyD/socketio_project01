const Room = require("../models/room");


exports.findRoom = (id) => {
    return Room.findById(id).populate("users").exec()
}

exports.findRooms = (roomName) => {
    return Room.find({roomName: roomName})
}

exports.createRoom = (room_data) => {

    let author = {
		id: room_data.userID,
		userName: room_data.userName
    }
    
    let users = [];
    users.push(room_data.userID);

	return Room.create ({
        roomName: room_data.roomName,
        author: author,
        users: users
    }
    
    )
}


// exports.findRoom = (id) => {
//     Room.findById(id).populate("users").exec(function(err, room){
//         console.log(room)
//     })
// }