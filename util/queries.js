const room = require("../models/room");
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
            password: room_data.password,
            author: author,
            users: users
        }
    )
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