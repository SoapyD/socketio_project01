// const deckController = require('./deck');
// const gameController = require('./game');

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
		socket.on('joinRoom', (data) => {

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

				//send user number info to all users
				// if (clients.length >= 2){
				// 	io.in(roomName).emit('checkStart', data);
				// }
			}else{
				io.to(socket.id).emit('joinFailed', "Room Full");
			}
		})				
		
	

        socket.emit("messageFromServer",{text:"Connected to the "+namespace+" channel"})

        socket.on('newMessageToServer', (message) => {
			io.of(namespace).emit("newMessageFromServer",{text:message.text})
        })		

		
		socket.on('disconnect', () => {
			console.log("user disconnected: "+socket.id);
		})
		
    })    
}


exports.checkSockets= (io) => {

    exports.checkMessages(io,'/');
    // exports.checkMessages(io,'/admin'); 
}