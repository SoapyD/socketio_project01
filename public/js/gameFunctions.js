
gameFunctions = []

gameFunctions.config = {
    cardSize: 100,
    handCardSize: 150,
    largeCardSize: 200,
    tableWidth: 7, //7
    tableHeight: 5, //5
    card_back: 15,	
    
    depth_card_table: 10,
    depth_card_table_graphic: 15,
    depth_card_hand: 20,
    depth_card_held: 30,
    
    game_state: 0,
    menu_state: 0,    
    roomName: '',
	roomID: '',
    playerNumber: 0,
    currentPlayer: 0, //1
    last_card: -1,
    selected_card: -1,

    xPosUp: -1,
    yPosUp: -1
}

gameFunctions.hand = [];
gameFunctions.cards = [];	
gameFunctions.btn_sprite = [];
gameFunctions.print_sprite = [];


//  #####   #####  ######  ####### #       #       ######     #    ######  
// #     # #     # #     # #     # #       #       #     #   # #   #     # 
// #       #       #     # #     # #       #       #     #  #   #  #     # 
//  #####  #       ######  #     # #       #       ######  #     # ######  
//       # #       #   #   #     # #       #       #     # ####### #   #   
// #     # #     # #    #  #     # #       #       #     # #     # #    #  
//  #####   #####  #     # ####### ####### ####### ######  #     # #     # 

gameFunctions.createScrollBar = () => {
	
	let cardNumber = 12;
	gameFunctions.config.yPosUp = gameFunctions.game.cameras.main.centerY + (config.height / 2) - (gameFunctions.config.handCardSize / 2);
	gameFunctions.config.yPosDown = gameFunctions.game.cameras.main.centerY + (config.height / 2);// + (gameFunctions.config.handCardSize / 4);	
	
	let scrollBar = gameFunctions.game.add.grid(
		// gameFunctions.game.cameras.main.centerX,
		0, gameFunctions.config.yPosDown, 
		gameFunctions.config.handCardSize * cardNumber,
		gameFunctions.config.handCardSize, 
		gameFunctions.config.handCardSize, 
		gameFunctions.config.handCardSize, 0xff6b70)
		.setAltFillStyle(0x70ff6b).setOutlineStyle(0x000000).setInteractive();			

	scrollBar.type = "scrollbar";
	scrollBar.cardNumber = cardNumber;
	scrollBar.setOrigin(0,0.5);
	scrollBar.setScrollFactor(0); //make buttons non-scrollable
	
    gameFunctions.game.input.setDraggable(scrollBar);	
	
    gameFunctions.game.input.on('drag', function (pointer, gameObject, dragX, dragY) {
		if (gameObject.type === "scrollbar"){			
			let x = dragX;
			let max_x = 0
            // let min_x = -(gameFunctions.config.handCardSize * gameObject.cardNumber) + (gameFunctions.config.cardSize * gameFunctions.config.tableWidth);
            //Allow the scrollbar to go all the way off the left hadn side of the screen
            let min_x = -(gameFunctions.config.handCardSize * gameObject.cardNumber)
            //adjust min_x so cards remain on screen
            min_x += config.width // gameFunctions.config.handCardSize

			if(x > max_x){
				x = max_x
			}

			if(x < min_x){
				x = min_x
			}		
			
			let data = {
				x: x		
			}
			connFunctions.requestMoveScrollbar(socket, data)          			
			
		}
    });	
	
	scrollBar.on('pointerover', function (pointer) {
        if (gameFunctions.config.playerNumber === gameFunctions.config.currentPlayer)
        {
            gameFunctions.game.tweens.add({
                targets: scrollBar,
                y: gameFunctions.config.yPosUp,
                duration: 500,
                ease: 'Power3'
            });    
        }		
	})		
	
	scrollBar.on('pointerout', function (pointer) {

		gameFunctions.game.tweens.add({
			targets: scrollBar,
			y: gameFunctions.config.yPosDown,
			duration: 500,
			ease: 'Power3'
		});    		
	})			
	
	gameFunctions.scrollBar = scrollBar;
}



// ######  #     # ####### ####### ####### #     # 
// #     # #     #    #       #    #     # ##    # 
// #     # #     #    #       #    #     # # #   # 
// ######  #     #    #       #    #     # #  #  # 
// #     # #     #    #       #    #     # #   # # 
// #     # #     #    #       #    #     # #    ## 
// ######   #####     #       #    ####### #     # 

gameFunctions.createButton = (game, x, y, label, clickAction, callbackParams, array) => {
    const btn = game.add.sprite(x, y, "buttons").setInteractive()
    var style = { font: "18px Arial", fill: "#000000", wordWrap: true, wordWrapWidth: btn.width, align: "center" }; //, backgroundColor: "#ffff00"

    btn.click = false
    btn.clickAction = clickAction;
    btn.callbackParams = callbackParams;

    btn.text = game.add.text(0, 0, label, style);
    btn.text.x = btn.x - (btn.text.width / 2)
    btn.text.y = btn.y	- (btn.text.height / 2)	
	btn.text.setScrollFactor(0); //make buttons non-scrollable
	
	btn.depth = 100;
	btn.text.depth = 110;
	btn.setScrollFactor(0); //make buttons non-scrollable
	
    array.push(btn);	

    return btn
}

gameFunctions.buttonPress = (sprite, callback, callbackParams) => {
	sprite.on('pointerover', function (event) {
		this.setFrame(1);
	});			
	sprite.on('pointerout', function (event) {
		this.setFrame(0)
	});						

    //PRESSING THE MOUSE BUTTON
	sprite.on('pointerup', function (event) {
		this.setFrame(1)
		//NEED TO SET THIS AS A SOCKET MESSAGE
		if (sprite.click === false){
			sprite.click = true;
			callback(callbackParams);
		}
    })			
    
    //RELEASING THE MOUSE BUTTON    
	sprite.on('pointerdown', function (event) {
		this.setFrame(2)
		if (sprite.click === true){
			sprite.click = false;
		}
	})			
}


//  #####  ####### ####### #     # ######        ######  #     # ####### ####### ####### #     #  #####  
// #     # #          #    #     # #     #       #     # #     #    #       #    #     # ##    # #     # 
// #       #          #    #     # #     #       #     # #     #    #       #    #     # # #   # #       
//  #####  #####      #    #     # ######  ##### ######  #     #    #       #    #     # #  #  #  #####  
//       # #          #    #     # #             #     # #     #    #       #    #     # #   # #       # 
// #     # #          #    #     # #             #     # #     #    #       #    #     # #    ## #     # 
//  #####  #######    #     #####  #             ######   #####     #       #    ####### #     #  ##### 

gameFunctions.setupButtons = () => {

	let callbackParams = {};
	gameFunctions.createButton(gameFunctions.game, 50, gameFunctions.game.cameras.main.centerY - 25, "lock card", connFunctions.requestLockCard, callbackParams, gameFunctions.btn_sprite);			
	gameFunctions.createButton(gameFunctions.game, 50, gameFunctions.game.cameras.main.centerY + 25, "end turn", connFunctions.requestChangePlayer, callbackParams, gameFunctions.btn_sprite);
	
	
	// let far_left = gameFunctions.tableWidth * gameFunctions.cardSize;
	let far_right = config.width
	
	callbackParams = {
		// roomName: gameFunctions.config.roomName,
		// roomID: gameFunctions.config.roomID,  
		deck_id: 0,
		card_type: "a2"	
	}
	gameFunctions.createButton(gameFunctions.game, far_right- 50, gameFunctions.game.cameras.main.centerY - 100, "armour", connFunctions.requestCreateCard, callbackParams, gameFunctions.btn_sprite);
	
	callbackParams = {
		// roomName: gameFunctions.config.roomName,				
		// roomID: gameFunctions.config.roomID, 
		deck_id: 1,
		card_type: "s2"	
	}			
	gameFunctions.createButton(gameFunctions.game, far_right- 50, gameFunctions.game.cameras.main.centerY - 50, "speed", connFunctions.requestCreateCard, callbackParams, gameFunctions.btn_sprite);
	
	callbackParams = {
		// roomName: gameFunctions.config.roomName,				
		// roomID: gameFunctions.config.roomID, 
		deck_id: 2,
		card_type: "p2"	
	}			
	gameFunctions.createButton(gameFunctions.game, far_right- 50, gameFunctions.game.cameras.main.centerY, "physical", connFunctions.requestCreateCard, callbackParams, gameFunctions.btn_sprite);
	
	callbackParams = {
		// roomName: gameFunctions.config.roomName,				
		// roomID: gameFunctions.config.roomID, 
		deck_id: 3,
		card_type: "f2"	
	}			
	gameFunctions.createButton(gameFunctions.game, far_right- 50, gameFunctions.game.cameras.main.centerY + 50, "focus", connFunctions.requestCreateCard, callbackParams, gameFunctions.btn_sprite);			
	
	callbackParams = {
		// roomName: gameFunctions.config.roomName,				
		// roomID: gameFunctions.config.roomID, 
		deck_id: 4,
		card_type: "c2"	
	}			
	gameFunctions.createButton(gameFunctions.game, far_right- 50, gameFunctions.game.cameras.main.centerY + 100, "cheat", connFunctions.requestCreateCard, callbackParams, gameFunctions.btn_sprite);			
	
	gameFunctions.btn_sprite.forEach(btn => {
		gameFunctions.buttonPress(btn, btn.clickAction, btn.callbackParams);                    
	})				
}


// ######  #######  #####  ####### #######  #####  
// #     # #       #     # #          #    #     # 
// #     # #       #       #          #    #       
// ######  #####    #####  #####      #     #####  
// #   #   #             # #          #          # 
// #    #  #       #     # #          #    #     # 
// #     # #######  #####  #######    #     #####  


gameFunctions.reloadGame = (room) => {

    let data;
    let card;

    gameFunctions.config.last_card = room.last_card

    if(room.cards){
        room.cards.forEach((card, i) => {

            // console.log(card)
            data = {
                deck_id: card.deck_id
                ,card_id: card.card_id
                ,card_type: card.card_type
            }

            created_card = gameFunctions.createCard(data);
            if (card.locked === true)
            {
                created_card.locked = true
                created_card.held = false
                created_card.x_table_pos = card.x_table_pos;
                created_card.y_table_pos = card.y_table_pos;	 
                created_card.x = card.x;
                created_card.y = card.y;
				created_card.depth = gameFunctions.config.depth_card_table
				
				created_card.angle = card.angle;
				created_card.orientation = card.orientation;
                
                created_card.setScrollFactor(1);
                created_card.setFrame(created_card.card_id);

                //REMOVE THE CARD FROM THE HAND
                gameFunctions.hand.forEach((h_card_id, i, object) => {
                    if(h_card_id === created_card.id){	
                        object.splice(i, 1);
                    }
                })	                

                // console.log(card)
                // console.log(created_card)                              
            }
        })
    }

}