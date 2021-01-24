
// const gameController = require('./game');
const queriesUtil = require('../util/queries');

// exports.room_decks = [];

class CardType {
    constructor(type, top, right, bottom, left) {
      this.type = type;
      this.colours = [];
      this.colours.push(top);
      this.colours.push(right);
      this.colours.push(bottom);
      this.colours.push(left);	  
    }
  }

exports.defineCards = () => {

	let definedCards = [];
	
	let cardCollection = [];
	
	cardCollection = [];
	cardCollection.push(new CardType("armour", "g", "b", "g", "y"))
	cardCollection.push(new CardType("armour", "g", "b", "g", "y"))
	cardCollection.push(new CardType("armour", "g", "b", "g", "y"))
	cardCollection.push(new CardType("armour", "g", "b", "g", "y"))
	cardCollection.push(new CardType("armour", "g", "b", "g", "y"))
	cardCollection.push(new CardType("armour", "g", "b", "g", "y"))
	cardCollection.push(new CardType("armour", "g", "b", "g", "y"))
	
	cardCollection.push(new CardType("armour", "g", "y", "y", "g"))
	cardCollection.push(new CardType("armour", "g", "y", "y", "g"))
	cardCollection.push(new CardType("armour", "g", "y", "y", "g"))
	cardCollection.push(new CardType("armour", "g", "y", "y", "g"))
	cardCollection.push(new CardType("armour", "g", "y", "y", "g"))	
	
	cardCollection.push(new CardType("armour", "g", "g", "g", "g"))
	cardCollection.push(new CardType("armour", "g", "g", "g", "g"))
	cardCollection.push(new CardType("armour", "g", "g", "g", "g"))
	
	definedCards.push(cardCollection)

	cardCollection = [];
	cardCollection.push(new CardType("speed", "b", "r", "b", "y"))
	cardCollection.push(new CardType("speed", "b", "r", "b", "y"))
	cardCollection.push(new CardType("speed", "b", "r", "b", "y"))
	cardCollection.push(new CardType("speed", "b", "r", "b", "y"))
	cardCollection.push(new CardType("speed", "b", "r", "b", "y"))
	cardCollection.push(new CardType("speed", "b", "r", "b", "y"))
	cardCollection.push(new CardType("speed", "b", "r", "b", "y"))
	
	cardCollection.push(new CardType("speed", "b", "y", "y", "b"))
	cardCollection.push(new CardType("speed", "b", "y", "y", "b"))
	cardCollection.push(new CardType("speed", "b", "y", "y", "b"))
	cardCollection.push(new CardType("speed", "b", "y", "y", "b"))
	cardCollection.push(new CardType("speed", "b", "y", "y", "b"))
	
	cardCollection.push(new CardType("speed", "b", "b", "b", "b"))
	cardCollection.push(new CardType("speed", "b", "b", "b", "b"))
	cardCollection.push(new CardType("speed", "b", "b", "b", "b"))
	
	definedCards.push(cardCollection)		
	
	cardCollection = [];
	cardCollection.push(new CardType("physical", "g", "b", "g", "r"))
	cardCollection.push(new CardType("physical", "g", "b", "g", "r"))
	cardCollection.push(new CardType("physical", "g", "b", "g", "r"))
	cardCollection.push(new CardType("physical", "g", "b", "g", "r"))
	cardCollection.push(new CardType("physical", "g", "b", "g", "r"))
	cardCollection.push(new CardType("physical", "g", "b", "g", "r"))
	cardCollection.push(new CardType("physical", "g", "b", "g", "r"))
	
	cardCollection.push(new CardType("physical", "g", "r", "r", "g"))
	cardCollection.push(new CardType("physical", "g", "r", "r", "g"))
	cardCollection.push(new CardType("physical", "g", "r", "r", "g"))
	cardCollection.push(new CardType("physical", "g", "r", "r", "g"))
	cardCollection.push(new CardType("physical", "g", "r", "r", "g"))
	
	cardCollection.push(new CardType("physical", "g", "g", "g", "g"))
	cardCollection.push(new CardType("physical", "g", "g", "g", "g"))
	cardCollection.push(new CardType("physical", "g", "g", "g", "g"))
	
	definedCards.push(cardCollection)		
	
	cardCollection = [];
	cardCollection.push(new CardType("focus", "b", "r", "b", "g"))
	cardCollection.push(new CardType("focus", "b", "r", "b", "g"))
	cardCollection.push(new CardType("focus", "b", "r", "b", "g"))
	cardCollection.push(new CardType("focus", "b", "r", "b", "g"))
	cardCollection.push(new CardType("focus", "b", "r", "b", "g"))
	cardCollection.push(new CardType("focus", "b", "r", "b", "g"))
	cardCollection.push(new CardType("focus", "b", "r", "b", "g"))
	
	cardCollection.push(new CardType("focus", "b", "g", "g", "b"))
	cardCollection.push(new CardType("focus", "b", "g", "g", "b"))
	cardCollection.push(new CardType("focus", "b", "g", "g", "b"))
	cardCollection.push(new CardType("focus", "b", "g", "g", "b"))
	cardCollection.push(new CardType("focus", "b", "g", "g", "b"))
	
	cardCollection.push(new CardType("focus", "b", "b", "b", "b"))
	cardCollection.push(new CardType("focus", "b", "b", "b", "b"))
	cardCollection.push(new CardType("focus", "b", "b", "b", "b"))
	
	definedCards.push(cardCollection)		
	
	cardCollection = [];
	cardCollection.push(new CardType("cheat", "y", "b", "y", "r"))
	cardCollection.push(new CardType("cheat", "y", "b", "y", "r"))
	cardCollection.push(new CardType("cheat", "y", "b", "y", "r"))
	cardCollection.push(new CardType("cheat", "y", "b", "y", "r"))
	cardCollection.push(new CardType("cheat", "y", "b", "y", "r"))
	cardCollection.push(new CardType("cheat", "y", "b", "y", "r"))
	cardCollection.push(new CardType("cheat", "y", "b", "y", "r"))
	
	cardCollection.push(new CardType("cheat", "y", "r", "r", "y"))
	cardCollection.push(new CardType("cheat", "y", "r", "r", "y"))
	cardCollection.push(new CardType("cheat", "y", "r", "r", "y"))
	cardCollection.push(new CardType("cheat", "y", "r", "r", "y"))
	cardCollection.push(new CardType("cheat", "y", "r", "r", "y"))
	
	cardCollection.push(new CardType("cheat", "y", "y", "y", "y"))
	cardCollection.push(new CardType("cheat", "y", "y", "y", "y"))
	cardCollection.push(new CardType("cheat", "y", "y", "y", "y"))
	
	definedCards.push(cardCollection)	
	
	return definedCards;
}






exports.resetDecks = () => {
    
	let decks = [];
	
	for (let i = 0; i < 5; i++) {
		
		let deckCards = [];
		for (let n = 0; n < 2; n++) { //Create 2 types of each card
			for (let d = 0; d < 15; d++) { //generate the base 15 cards frome ach deck
				deckCards.push(d);
			}
		}		
		decks.push(deckCards);
	}	
	
    return decks;
}

exports.getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}

// exports.findRoomInfo = (roomName) => {
// 	let pos = -1;
// 	// console.log(exports.room_decks)
// 	for(let i=0; i < exports.room_decks.length; i++){
// 		let room_deck = exports.room_decks[i];
// 		if (room_deck.roomName === roomName){
// 			pos = i;
// 		}
// 	}
// 	return pos
// }

exports.drawCard = (roomID, deck_id) => {
	
	queriesUtil.findRoom(roomID)
	.then((room) => {

		let card_id = -1;

		if (room){
			let deck = room.decks[deck_id];
			if(deck.length > 0)
			{
				let rand = exports.getRandomInt(deck.length);
				card_id = deck[rand];
				deck.splice(rand, 1);
			}
			room.save()
		}
		return card_id;
	})
}






exports.setupBoardMatrix = () => {
	
    let boardMatrix = [];
    let tableHeight = 5;
    let tableWidth = 7;

    for (let y = 0; y < tableHeight ; y++) {
        let boardSegment = [];
        for (let x = 0; x < tableWidth; x++) {
            boardSegment.push({
                deck_id: -1,
                card_id: -1,
                card_number: -1,
                orientation: -1
            });
        }
        boardMatrix.push(boardSegment);
    }	
    
    return boardMatrix;
}

exports.updateBoardMatrix = (data) => {
	// console.log(data)
	let pos = exports.findRoomInfo(data.roomName);
	
	if (pos !== -1){
		let boardMatrix = exports.room_decks[pos].boardMatrix;
		let board_part = boardMatrix[data.y_table_pos][data.x_table_pos];
		board_part.deck_id = data.deck_id;
		board_part.card_id = data.card_id;
		board_part.card_number = data.card_number;		
		board_part.orientation = data.orientation;	
	}

}

exports.checkBoardMatrix = (data) => {
	let pos = exports.findRoomInfo(data.roomName);
	
	if (pos !== -1){
		let boardMatrix = exports.room_decks[pos].boardMatrix;
		// let board_part = boardMatrix[data.y_table_pos][data.x_table_pos];
		// let board_check_part;
		// console.log(board_part)
		
		let check_data = {
			pass_check: true
			,roomName: data.roomName
			,deck_id: data.deck_id
			,card_id: data.card_id
			,card_number: data.card_number
			,orientation: data.orientation
		};
		let touch_direction;
		
		for(let y=-1; y<=1;y++){
			// console.log(y);
			// if (y !== 0 && y + data.y_table_pos > 0 && y + data.y_table_pos < gameController.tableHeight){
			if (y !== 0 && y + data.y_table_pos > 0 && y + data.y_table_pos < gameController.game_info.tableHeight)
			{
				board_check_part = boardMatrix[data.y_table_pos + y][data.x_table_pos];
				if (board_check_part.deck_id !== -1){
					touch_direction = 2;
					if (y > 0){
						touch_direction = 0;
					}
					check_data.touch_direction = touch_direction;
					check_data.last_deck_id = board_check_part.deck_id;
					check_data.last_card_id = board_check_part.card_id;
					check_data.last_card_number = board_check_part.card_number;
					check_data.last_orientation = board_check_part.orientation;
				
					check_data = exports.checkCardPlacement(check_data)
					if( check_data.pass_check === false){
						data.pass_check = false;
					}
				}
			}
		}
		for(let x=-1; x<=1;x++){
			// console.log(x + data.x_table_pos);
			if (x !== 0 && x + data.x_table_pos > 0 && x + data.x_table_pos < gameController.game_info.tableWidth){
				// console.log("x:"+x.toString()+", y:"+data.y_table_pos.toString())	
				board_check_part = boardMatrix[data.y_table_pos][data.x_table_pos + x];		
				
				if (board_check_part.deck_id !== -1){
					touch_direction = 1;
					if (x > 0){
						touch_direction = 3;
					}	
					check_data.touch_direction = touch_direction;
					check_data.last_deck_id = board_check_part.deck_id;
					check_data.last_card_id = board_check_part.card_id;
					check_data.last_card_number = board_check_part.card_number;
					check_data.last_orientation = board_check_part.orientation;
				
					check_data = exports.checkCardPlacement(check_data)
					if( check_data.pass_check === false){
						data.pass_check = false;
					}
				}				
				
				
			}
		}		
	}	
}





/*


// exports.


class Player {
  constructor(playerNumber, playerName, life, armour,
			  a, s, p, f, c) {
	this.playerNumber = playerNumber;
	this.playerName = playerName;
	this.life = life;
	this.armour = armour;
	this.arms = 2;
	this.legs = 2;
	  
    this.card_makeup = [];		  
	this.card_makeup.push(a);
	this.card_makeup.push(s);
	this.card_makeup.push(p);
	this.card_makeup.push(f);
	this.card_makeup.push(c);	  
  }
}

exports.addPlayer = (roomName, playerName, playerNumber) => {

	let pos = exports.findRoomInfo(roomName);	
	let player = new Player(playerNumber, playerName, 30, 0, 2, 2, 2, 0, 0);
	exports.room_decks[pos].players.push(player);
	// console.log(exports.room_decks[pos].players);
}



exports.checkCardPlacement = (data) => {
	
	let pos = exports.findRoomInfo(data.roomName);
	let definedCards = exports.room_decks[pos].definedCards;
	
	let lastCardInfo = definedCards[data.last_deck_id][data.last_card_number];
	let cardInfo = definedCards[data.deck_id][data.card_number];		
	
	let lastCardPos = (data.touch_direction - data.last_orientation)
	if (lastCardPos < 0){
		lastCardPos += 4;
	}
	let lastCardColour = lastCardInfo.colours[lastCardPos];

	data.touch_direction = data.touch_direction + 2
	if (data.touch_direction > 3){
		data.touch_direction -= 4;
	}

	let CardPos = (data.touch_direction - data.orientation)
	if (CardPos < 0){
		CardPos += 4;
	}		

	let CardColour = cardInfo.colours[CardPos];

	if (lastCardColour !== CardColour){
		data.pass_check = false;
	}	

	console.log("Deck ID: "+data.deck_id.toString()+" | Card: "+CardColour+" - "+CardPos.toString()+" | Touch Dir: "+data.touch_direction.toString()+" | Orientation: "+data.orientation.toString())	
	console.log("Last Deck ID: "+data.last_deck_id.toString()+" | LastCard: "+lastCardColour+" - "+lastCardPos.toString() + " | Type: "+lastCardInfo.type)	
	
	return data
}
		



*/