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

	
	let config = {
		// cardSize: 150
		// ,handCardSize: 200
		// ,largeCardSize: 225        
		cardSize: 100
		,handCardSize: 150
		,largeCardSize: 200
		,tableWidth: 7 //7
		,tableHeight: 5 //5
		,card_back: 15

		,depth_card_table: 10
		,depth_card_table_graphic: 15
		,depth_card_hand: 20
		,depth_card_held: 30

		// game_state: 0,
		// roomName: '',
		// roomID: '',
		// playerNumber: 0,
		// currentPlayer: 0, //1
		// last_card: -1,
		// selected_card: -1,
		// xPosUp: -1,
		// yPosUp: -1
	}	
	
    let decks = deckController.resetDecks();
    let boardmatrix = deckController.setupBoardMatrix(config);	
	
    let max_players = 1

    let characters = []
    for (let i = 0; i < max_players; i++) {
        let character = {
            id: i
        }
        characters.push(character)
    }

    return Room.create ({
        roomName: room_data.roomName
        ,password: room_data.password
        ,author: author
        ,users: users
        ,sockets: sockets
        ,characters: characters
		
		,max_players: max_players
		,config: config
        ,decks: decks
        ,matrix: boardmatrix
    })
}

exports.setSelectedCard = (data) => {
    return new Promise(function(resolve,reject)
    {
		let saved = false;
		// console.log(data)

        exports.findRoom(data.roomID)
        .then((room) => {
    
            if (room){
				room.selected_card = data.cards_array_id
				
	
				let card = room.cards[data.cards_array_id] 				
				
				card.x = data.card_x
				card.y = data.card_y				
				
				//SET THE ARD SNAPPING TO A GRID POSITION
				card.x_table_pos = Math.floor(card.x / room.config.cardSize);
				card.y_table_pos = Math.floor(card.y / room.config.cardSize);				
				card.x = card.x_table_pos * room.config.cardSize + (room.config.cardSize / 2)
				card.y = card.y_table_pos * room.config.cardSize + (room.config.cardSize / 2)				
				

				room.cards[data.cards_array_id] = card
				
				room.markModified('selected_card');
				room.markModified('cards');
				room.save((err, room)=>{
					resolve(room)
				})	
            }
			else{
				resolve(room)
			}
        })
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