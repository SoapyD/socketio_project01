// const deckController = require('./deck');
// const gameController = require('./game');

const functionsUtil = require('../util/functions');
const queriesUtil = require('../util/queries');
const User = require("../models/user");
const room = require('../models/room');

// const exports = [];

// exports.getClientsInRoom = (io, namespace, roomName) => {
	
// 	var clients = []
	
// 	if(io.sockets.adapter.rooms[roomName])
// 	{
// 		var clients = io.nsps[namespace].adapter.rooms[roomName];
// 	}
// 	return clients;
// }

// exports.getPlayerNumber = (io, socket, namespace, roomName) => {
// 	//GET THE CLIENT LIST TO SEE IF THIS IS THE FIRST PLAYER IN THE ROOM
// 	let clients = exports.getClientsInRoom(io, namespace, roomName)

// 	const keys = Object.keys(clients.sockets);
	
// 	let playerNumber = 0;
	
// 	for (let [i, key] of keys.entries())
// 	{
// 		if (socket.id === key)
// 		{
// 			playerNumber = i + 1;
// 		}
// 	}
// 	return playerNumber;
// }



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
						if(room.sockets.indexOf(socket.id) > -1){
							io.to(socket.id).emit('MessageFromServer', "You're already in this room");							
						}else{
							io.to(socket.id).emit('MessageFromServer', "Room already exists, please use join button to rejoin it");								
						}
					}
					else{
						io.to(socket.id).emit('MessageFromServer', 'Creation failed, please choose another name');							
					}
				}else{
					// ELSE, ALLOW THE ROOM TO BE CREATED
					io.to(socket.id).emit('MessageFromServer', 'Creating room.');

					queriesUtil.createRoom(data, socket.id)
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
						socket.join(data.roomName)
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
						if(room.sockets.indexOf(socket.id) > -1){
							io.to(socket.id).emit('MessageFromServer', "You're already in this room");							
						}else{
							io.to(socket.id).emit('MessageFromServer', "Rejoining room");														
							room.sockets.push(socket.id);

							room.save(function(err, room) {
								let return_data = {
									userName: data.userName
									,roomName: data.roomName
									,playerNumber: room.users.indexOf(data.userID)
								}
								//send room info back to socket
								io.to(socket.id).emit('roomInfo', return_data);				
							})
							socket.join(data.roomName)							
						}
					}
					else{					
						//ADD USER TO ROOM THEN RETURN DATA
						room.users.push(data.userID);
						room.sockets.push(socket.id);

						room.save(function(err, room) {
							let return_data = {
								userName: data.userName
								,roomName: data.roomName
								,playerNumber: room.users.indexOf(data.userID)
							}
							//send room info back to socket
							io.to(socket.id).emit('roomInfo', return_data);				
						})
						socket.join(data.roomName)
					}
				
				}else{
					// ELSE, ALLOW THE ROOM TO BE CREATED
					io.to(socket.id).emit('MessageFromServer', "Join failed. Room Doesn't exist");

				}
			})
		})    

		socket.on('MessageToServer', (data) => {
			io.in(data.roomName).emit("MessageFromServer",data.text)
		})	

		socket.on('disconnect', () => {

			queriesUtil.findRoomsWithSocket(socket.id)
			.then((rooms) => {
				if (rooms.length > 0){
					let room = rooms[0];
					let sockets = rooms[0].sockets; 			
					sockets = functionsUtil.removeFromArray(sockets, socket.id)
					room.sockets = sockets;
					room.save();
					console.log("user disconnected: "+socket.id);
				}
			});
		})		



		// socket.on('requestCreateCard', (data) => {
		// 	let card_number = deckController.drawCard(data.roomName, data.deck_id);
		// 	data.card_number = card_number;
		// 	io.of(namespace).emit("CreateCard", data)
		// })	

		// socket.on('requestMoveCard', (data) => {
		// 	io.of(namespace).emit("MoveCard", data)
		// })	

		// socket.on('requestRotateCard', (data) => {
		// 	io.of(namespace).emit("RotateCard",data)
		// })			

		// socket.on('requestSizeCard', (data) => {
		// 	io.of(namespace).emit("SizeCard",data)
		// })					
		
		// socket.on('requestGridSnapCard', (data) => {
		// 	io.of(namespace).emit("GridSnapCard",data)
		// })							
		
		// socket.on('requestPalmCard', (data) => {
		// 	io.of(namespace).emit("PalmCard",data)
		// })		
		
		// socket.on('requestLockCard', (data) => {
		// 	io.of(namespace).emit("LockCard",data)
		// })									
		
		socket.on('requestMoveScrollbar', (data) => {
			io.of(namespace).emit("MoveScrollbar", data)
		})											
		
		// socket.on('requestChangePlayer', () => {
		// 	io.of(namespace).emit("ChangePlayer")
		// })			

		// socket.on('requestCheckBoard', (data) => {
		// 	if(data.touching === 1){ // && data.pass_check === true
		// 		deckController.checkBoardMatrix(data);
		// 	}
		// 	if(data.pass_check === true){
		// 		deckController.updateBoardMatrix(data);
		// 	}
			
		// 	io.of(namespace).emit('resolveCheckBoard', data);			
		// })			
		

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