// const deckController = require('./deck');
// const gameController = require('./game');

const queriesUtil = require('../util/queries');
const User = require("../models/user");
const room = require('../models/room');

// const exports = [];

exports.getClientsInRoom = (io, namespace, roomName) => {
	
	var clients = []
	
	if(io.sockets.adapter.rooms[roomName])
	{
		var clients = io.nsps[namespace].adapter.rooms[roomName];
		// totalUsers = clients.length;
	}
	// console.log(clients)
	return clients;
}

exports.getPlayerNumber = (io, socket, namespace, roomName) => {
	//GET THE CLIENT LIST TO SEE IF THIS IS THE FIRST PLAYER IN THE ROOM
	let clients = exports.getClientsInRoom(io, namespace, roomName)

	const keys = Object.keys(clients.sockets);
	
	let playerNumber = 0;
	
	for (let [i, key] of keys.entries())
	{
		if (socket.id === key)
		{
			playerNumber = i + 1;
		}
	}
	
	return playerNumber;
}



exports.checkMessages = (io,namespace) => {
    io.of(namespace).on('connection', (socket, req)=> {

		//JOIN THE PLAYER TO A ROOM
		socket.on('createRoom', (data) => {

			// CHECK TO SEE IF ROOM ALREADY EXISTS
			queriesUtil.findRooms(data.roomName)
			.then((rooms) => {
				// console.log(rooms.length);

				if (rooms.length > 0){
					// IF ROOM NAME EXISTS, FAIL THE CREATION PROCESS
					let room = rooms[0];
					if(room.users.indexOf(data.userID) > -1){
						io.to(socket.id).emit('MessageFromServer', "You're already in this room");							
					}
					else{
						io.to(socket.id).emit('MessageFromServer', 'Creation failed, please choose another name');							
					}
				}else{
					// ELSE, ALLOW THE ROOM TO BE CREATED
					io.to(socket.id).emit('MessageFromServer', 'Creating room.');

					// let room_data = {
					// 	roomName: data.roomName,
					// 	password: data.password,						
					// 	userID: data.userID,
					// 	userName: data.userName
					// }
					queriesUtil.createRoom(data)
					.then((room) => {
						// console.log(room);
						// io.to(socket.id).emit('roomInfo', data);
						// io.in(roomName).emit('roomMessage', data);
						
						// io.to(socket.id).emit('MessageFromServer', 'Room Created!');

						let return_data = {
							userName: data.userName
							,roomName: data.roomName
							,playerNumber: room.users.indexOf(data.userID)
						}
						
						//send room info back to socket
						io.to(socket.id).emit('roomInfo', return_data);

					})

				}
			})
		})

		//JOIN THE PLAYER TO A ROOM
		socket.on('joinRoom', (data) => {

			// CHECK TO SEE IF ROOM ALREADY EXISTS
			queriesUtil.findRooms(data.roomName)
			.then((rooms) => {
				// console.log(rooms.length);

				if (rooms.length > 0){
					let room = rooms[0];

					if(room.users.indexOf(data.userID) > -1){
						io.to(socket.id).emit('MessageFromServer', "You're already in this room");							
					}
					else{					
						//ADD USER TO ROOM THEN RETURN DATA
						room.users.push(data.userID);
						room.save(function(err, room) {
							let return_data = {
								userName: data.userName
								,roomName: data.roomName
								,playerNumber: room.users.indexOf(data.userID)
							}
							//send room info back to socket
							io.to(socket.id).emit('roomInfo', return_data);				
						})
					}
				
				}else{
					// ELSE, ALLOW THE ROOM TO BE CREATED
					io.to(socket.id).emit('MessageFromServer', "Join failed. Room Doesn't exist");

				}
			})

			socket.on('disconnect', () => {
				console.log("user disconnected: "+socket.id);
			})
			
		})    
	})
}

			/*
			let roomName = data.roomName
			let playerNumber = 0
			
			let clients = exports.getClientsInRoom(io, namespace, roomName)
			
			let joined_room = false;
			
			// //IF THE ROOM EXISTS, CHECK THE PLAYER NUMBER
			if(clients.length > 0)
			{
				if (clients.length < 2)
				{		
					socket.join(roomName)
					playerNumber = exports.getPlayerNumber(io, socket, namespace, roomName)
					joined_room = true;
				}
			}
			else
			{
				// RESET ROOM CODE GOES HERE, RESET HAPPENS WHEN FIRST PERSON ENTERS ROOM
				socket.join(roomName)
				playerNumber = exports.getPlayerNumber(io, socket, namespace, roomName)
				joined_room = true;				
			}
			
			if (joined_room === true)
			{                
				clients = exports.getClientsInRoom(io, namespace, roomName)
				
				data = {
					userName: data.userName
					,roomName: roomName
					,playerNumber: playerNumber
					,usersNumber: clients.length
				}
				
        		//send room info back to socket
				io.to(socket.id).emit('roomInfo', data);

				io.in(roomName).emit('roomMessage', data);

			}else{
				io.to(socket.id).emit('joinFailed', "Room Full");
			}
			*/
				
		
	

        // socket.emit("messageFromServer",{text:"Connected to the "+namespace+" channel"})

        // socket.on('newMessageToServer', (message) => {
		// 	io.of(namespace).emit("newMessageFromServer",{text:message.text})
        // })		

		



exports.checkSockets= (io) => {

    exports.checkMessages(io,'/');
    // exports.checkMessages(io,'/admin'); 
}