
// const gameController = require('./game');
const queriesUtil = require('../util/queries');

// exports.room_decks = [];





//  #####     #    ######  ######   #####  
// #     #   # #   #     # #     # #     # 
// #        #   #  #     # #     # #       
// #       #     # ######  #     #  #####  
// #       ####### #   #   #     #       # 
// #     # #     # #    #  #     # #     # 
//  #####  #     # #     # ######   #####  

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



// ######  #######  #####  #    #  #####  
// #     # #       #     # #   #  #     # 
// #     # #       #       #  #   #       
// #     # #####   #       ###     #####  
// #     # #       #       #  #         # 
// #     # #       #     # #   #  #     # 
// ######  #######  #####  #    #  #####  


exports.resetDecks = () => {
    
	let decks = [];
	
	for (let i = 0; i < 5; i++) {
		
		let deckCards = [];
		for (let n = 0; n < 2; n++) { //Create 2 types of each card
			for (let d = 0; d < 15; d++) { //generate the base 15 cards from each deck
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


exports.drawCard = (data) => {
    
// 	SETUP a promise that we need to resolve before the function returns anything
    return new Promise(function(resolve,reject)
    {
        let card_id = -1;

        queriesUtil.findRoom(data.roomID)
        .then((room) => {
    
            if (room){
                let deck = room.decks[data.deck_id];
                if(deck.length > 0)
                {
                    let rand = exports.getRandomInt(deck.length);
                    card_id = deck[rand];
                    deck.splice(rand, 1);
                    room.decks[data.deck_id] = deck;

					room.cards.push({
						deck_id: data.deck_id
                        ,card_id: card_id
                        ,card_type: data.card_type
					})

					room.markModified('decks');
					room.markModified('cards');
					room.save((err, room)=>{
						resolve(card_id)
					})				
				
				}
				else{
					resolve(card_id)
				}
            }
			else{
				resolve(card_id)
			}
        })
    })
}

//CHECK TO SEE, IF THERE IS A LAST CARD, THAT THE CURRENT CARD IS TOUCHING IT
exports.checkTouching = (data) => {
	//GET CARD

    return new Promise(function(resolve,reject)
    {	
		//TOUCHING CHECK WITH LAST CARD
		let return_data = data
		return_data.touching = 0


		queriesUtil.findRoom(data.roomID)
		.then((room) => {	

			if (room){		
				//

				let card = room.cards[data.cards_array_id];
				return_data.card = card;
				
				let last_card;

				//CHECK IF POSITION IS NEXT TO LAST CARD
				let touch_direction = -1; //touching direction between last and new card 


				if(room.last_card !== -1) //if there is a last card
				{
					last_card = room.cards[room.last_card];
					return_data.last_card = last_card;
					
					if (last_card.x_table_pos - 1 === card.x_table_pos || last_card.x_table_pos + 1 === card.x_table_pos){
						if (last_card.y_table_pos === card.y_table_pos){
							return_data.touching = 1;

							if(card.x_table_pos < last_card.x_table_pos){
								touch_direction = 3
							}
							if(card.x_table_pos > last_card.x_table_pos){
								touch_direction = 1
							}				
						}
					}

					if (last_card.y_table_pos - 1 === card.y_table_pos || last_card.y_table_pos + 1 === card.y_table_pos){
						if (last_card.x_table_pos === card.x_table_pos){
							return_data.touching = 1;

							if(card.y_table_pos < last_card.y_table_pos){
								touch_direction = 0
							}
							if(card.y_table_pos > last_card.y_table_pos){
								touch_direction = 2
							}								
						}
					}		
				}else{
					return_data.touching = -1;
				}

				// console.log("touching: "+touching.toString())

				// if (touching !== 0){
				// 	//LOCK AND FLIP THE CARD
				// }
				return_data.touch_direction = touch_direction;
				return_data.room = room;
				
				resolve(return_data)
			}
			else{
				resolve(return_data);
			}
			/**/
		})
	})
}



// #     #    #    ####### ######  ### #     # 
// ##   ##   # #      #    #     #  #   #   #  
// # # # #  #   #     #    #     #  #    # #   
// #  #  # #     #    #    ######   #     #    
// #     # #######    #    #   #    #    # #   
// #     # #     #    #    #    #   #   #   #  
// #     # #     #    #    #     # ### #     # 

exports.setupBoardMatrix = (config) => {
	
    let boardMatrix = [];
    // let tableHeight = 5;
    // let tableWidth = 7;

    for (let y = 0; y < config.tableHeight ; y++) {
        let boardSegment = [];
        for (let x = 0; x < config.tableWidth; x++) {
            boardSegment.push({
                deck_id: -1,
                card_id: -1,
                cards_array_id: -1,
                orientation: -1
            });
        }
        boardMatrix.push(boardSegment);
    }	
    
    return boardMatrix;
}

exports.updateBoardMatrix = (data) => {

	return new Promise(function(resolve,reject)
	{		
		if (data.room){

			// let boardMatrix = room.matrix;
			// console.log(data)
			let board_part = data.room.matrix[data.card.y_table_pos][data.card.x_table_pos];
			board_part.deck_id = data.card.deck_id;
			board_part.card_id = data.card.card_id;
			board_part.cards_array_id = data.cards_array_id;		
			board_part.orientation = data.orientation;		

			data.room.matrix[data.card.y_table_pos][data.card.x_table_pos] = board_part;
            data.room.last_card = data.cards_array_id;
            
            data.room.cards[data.cards_array_id].locked = true;

			data.room.markModified('matrix');
            data.room.markModified('last_card');
            data.room.markModified('cards');
			data.room.save((err, room)=>{
				resolve(true)
			})
		}
		else{
			resolve(false)
		}
	})
}

//LOOP THROUGH THE BOARD MATRIX TO SEE IF THERE#S ANY CLASHES THERE
exports.checkBoardMatrix = (data) => {
	
	let pass_check = true
	
	if (data.room){
		
		let check_data = data;
		let boardMatrix = data.room.matrix;
		let touch_direction;
		let board_check_part;
        
        
        //CHECK MATRIX PARTS ABOVE AND BELOW CURRENT CARD
		for(let y=-1; y<=1;y++){

			if (y !== 0 && y + data.card.y_table_pos > 0 && y + data.card.y_table_pos < data.room.config.tableHeight)
			{
				board_check_part = boardMatrix[data.card.y_table_pos + y][data.card.x_table_pos];
				if (board_check_part.deck_id !== -1){
					touch_direction = 2;
					if (y > 0){
						touch_direction = 0;
					}

					check_data.board_card = board_check_part
					check_data.touch_direction = touch_direction;
				
					check_data = exports.checkCardPlacement(check_data)
					if( check_data.pass_check === false){
						// data.pass_check = false;
						pass_check = false;
					}
				}
			}
        }
        
        //CHECK MATRIX PARTS LEFT AND RIGHT OF CURRENT CARD
		for(let x=-1; x<=1;x++){

			if (x !== 0 && x + data.card.x_table_pos > 0 && x + data.card.x_table_pos < data.room.config.tableWidth){

				board_check_part = boardMatrix[data.card.y_table_pos][data.card.x_table_pos + x];		
				
				if (board_check_part.deck_id !== -1){
					touch_direction = 1;
					if (x > 0){
						touch_direction = 3;
					}	

					check_data.board_card = board_check_part
					check_data.touch_direction = touch_direction;				
					
					check_data = exports.checkCardPlacement(check_data)
					if( check_data.pass_check === false){
						// data.pass_check = false;
						pass_check = false;
					}
				}				
								
			}
		}		
	}
	
	return pass_check
}


exports.checkCardPlacement = (data) => {
	
	let definedCards = exports.defineCards();
    
    //GET THE CARD INFO FOR THE CARD AND BOARD SECTION
	let boardCardInfo = definedCards[data.board_card.deck_id][data.board_card.card_id];
	let cardInfo = definedCards[data.card.deck_id][data.card.card_id];	
    
    //GET THE BOARD SECTION TOUCHING POSTION AND RELATED COLOUR
	let lastCardPos = (data.touch_direction - data.board_card.orientation)
	if (lastCardPos < 0){
		lastCardPos += 4;
	}
	let lastCardColour = boardCardInfo.colours[lastCardPos];

    //GET THE CARD TOUCHING POSITION AND RELATED COLOUR
	data.touch_direction = data.touch_direction + 2
	if (data.touch_direction > 3){
		data.touch_direction -= 4;
	}

	let CardPos = (data.touch_direction - data.orientation)
	if (CardPos < 0){
		CardPos += 4;
	}		

	let CardColour = cardInfo.colours[CardPos];

    //IF CARD COLOURS DON'T MATCH, REJECT CHECK
	if (lastCardColour !== CardColour){
		data.pass_check = false;
	}	

	console.log(
        "Deck ID: "+data.card.deck_id.toString()
        +" | Card: "+CardColour+" - "+CardPos.toString()
        +" | Touch Dir: "+data.touch_direction.toString()
        +" | Orientation: "+data.orientation.toString()
        )	
	console.log(
        "Last Deck ID: "+data.board_card.deck_id.toString()
        +" | LastCard: "+lastCardColour+" - "
        +lastCardPos.toString()
        +" | Type: "+boardCardInfo.type)	
	
	return data
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







*/