const deckController = require('../controllers/deck');
// const gameController = require('./game');

const functionsUtil = require('../util/functions');
const queriesUtil = require('../util/queries');
// const User = require("../models/user");
// const room = require('../models/room');



//    #    ######  #     # ### #     # 
//   # #   #     # ##   ##  #  ##    # 
//  #   #  #     # # # # #  #  # #   # 
// #     # #     # #  #  #  #  #  #  # 
// ####### #     # #     #  #  #   # # 
// #     # #     # #     #  #  #    ## 
// #     # ######  #     # ### #     # 

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
						
						let return_data = {
							userName: data.userName
							,roomName: data.roomName
							,roomID: room._id
							,playerNumber: room.users.indexOf(data.userID)
						}
						socket.join(data.roomName)
						//send room info back to socket
						io.to(socket.id).emit('roomInfo', return_data);

						if (room.users.length >= room.max_players){
							io.of(namespace).emit("startGame", data)
						}						
						
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
									,roomID: room._id
                                    ,playerNumber: room.users.indexOf(data.userID)
                                    ,room: room
                                    ,type: 'rejoining'
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
								,roomID: room._id
								,playerNumber: room.users.indexOf(data.userID)
							}
							//send room info back to socket
							io.to(socket.id).emit('roomInfo', return_data);				
						})
						socket.join(data.roomName)
					}
					
					if (room.users.length >= room.max_players){
						io.of(namespace).emit("startGame", data)
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


//  #####   #####  ######  ####### #       #       ######     #    ######  
// #     # #     # #     # #     # #       #       #     #   # #   #     # 
// #       #       #     # #     # #       #       #     #  #   #  #     # 
//  #####  #       ######  #     # #       #       ######  #     # ######  
//       # #       #   #   #     # #       #       #     # ####### #   #   
// #     # #     # #    #  #     # #       #       #     # #     # #    #  
//  #####   #####  #     # ####### ####### ####### ######  #     # #     # 		


		socket.on('requestMoveScrollbar', (data) => {
			io.of(namespace).emit("MoveScrollbar", data)
		})										


//  #####     #    ######  ######   #####  
// #     #   # #   #     # #     # #     # 
// #        #   #  #     # #     # #       
// #       #     # ######  #     #  #####  
// #       ####### #   #   #     #       # 
// #     # #     # #    #  #     # #     # 
//  #####  #     # #     # ######   ##### 		


		socket.on('requestCreateCard', (data) => {

			if (data.roomID !== '')
			{
                // let card_number = deckController.drawCard(data.roomID, data.deck_id);
                deckController.drawCard(data) //data.roomID, data.deck_id
                .then((card_id) =>{
                    // let card_number = 0
					if (card_id >= 0){
						data.card_id = card_id;
						io.of(namespace).emit("CreateCard", data)							
					}
                });
			
			}

		})	

		socket.on('requestMoveCard', (data) => {
			io.of(namespace).emit("MoveCard", data)
		})	

		socket.on('requestRotateCard', (data) => {

			queriesUtil.findRoom(data.roomID)
			.then((room) => {
				
				let card = room.cards[data.cards_array_id];
				
				if (card.angle === data.angle){

					card.angle += 90
					if (card.angle >= 180){
						card.angle = -180
					}

					switch(card.angle) {
						case 0:
							card.orientation = 0; //0
							break;
						case 90:
							card.orientation = 1; //90
							break;	
						case -180:
							card.orientation = 2; //180
							break;
						case -90:
							card.orientation = 3; //270
							break;				
						default:
					}

					data.angle = card.angle;
					data.orientation = card.orientation;

					room.cards[data.cards_array_id] = card;
					room.markModified('cards');
					room.save((err, room)=>{
						io.of(namespace).emit("RotateCard",data)
					})						
					
				}

			})
		})			

		socket.on('requestSizeCard', (data) => {
			io.of(namespace).emit("SizeCard",data)
		})					
		
		socket.on('requestGridSnapCard', (data) => {
			//ADD IN SET SELECTED CARD FUNCTION HERE
			queriesUtil.setSelectedCard(data)
			.then((room)=> {
				let old_data = data
				let card = room.cards[old_data.cards_array_id];
				
				data = {
					cards_array_id: old_data.cards_array_id
					,card_x: card.x
					,card_y: card.y	
					,card_x_table_pos: card.x_table_pos
					,card_y_table_pos: card.y_table_pos						
				}
				io.of(namespace).emit("GridSnapCard",data)				
			})

		})							
		
		socket.on('requestPalmCard', (data) => {
			io.of(namespace).emit("PalmCard",data)
		})		
		
		socket.on('requestLockCard', (data) => {
			
// 			CHECK IF CARD IS TOUCHING LAST PLACED CARD
			deckController.checkTouching(data)
			.then((check_touching_data) => {
				// console.log(check_touching_data)
				
				
				if (check_touching_data.room){
					// IF LAST CARD DOESN'T EXIST (-1) OR CARD IS TOUCHING LAST CARD (1), CHECK BOARD MATRIX 					
					if (check_touching_data.touching !== 0)
					{
						let pass_check = deckController.checkBoardMatrix(check_touching_data)
                        
                        console.log("locking card check: "+pass_check)
						//IF NOT CLASHING BOARD MATRIX, UPDATE MATRIX AND LOCK CARD
						if (pass_check === true){
							
							deckController.updateBoardMatrix(check_touching_data)
							.then((complete) => {
								// console.log("locking card check: "+complete)
								if (complete === true){
									io.of(namespace).emit("LockCard",data)
								}
								
							})
							
						}
					}
				}	
				/**/
				
			})
			

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


		
		



exports.checkSockets= (io) => {

    exports.checkMessages(io,'/');
    // exports.checkMessages(io,'/admin'); 
}