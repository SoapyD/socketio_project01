gameFunctions.createCard = (data) => {

	// let game = gameFunctions.game;
	//LOAD A CARD SPRITE AND RESCALE IT
    let card = gameFunctions.game.add.sprite(gameFunctions.game.cameras.main.centerX, gameFunctions.game.cameras.main.centerY, data.card_type).setInteractive();
	

	//WHEN THE CARD IS DRAGGED, SEND IT OVER THE SOCKET SO IT UPDATES FOR EVERYONE
    gameFunctions.game.input.on('drag', function (pointer, gameObject, dragX, dragY) {
		if(gameObject.type === "card"){			
			if (gameFunctions.config.playerNumber === gameFunctions.config.currentPlayer)
			{                
				let data = {
					card_id: gameObject.id,
					mouseX: dragX,
					mouseY: dragY		
				}
				connFunctions.requestMoveCard(socket, data)                
			}
		}
    });
	
	//ENLARGE CARD WHEN LEFT BUTTON IS DOWN
	card.on('pointerdown', function (pointer) {
        if (pointer.leftButtonDown())
        {			
			let data = {
				card_id: card.id,
				size: gameFunctions.config.largeCardSize
			}			
			connFunctions.requestSizeCard(socket, data) 	
			
			// card.held = true;
		}
		
		gameFunctions.game.tweens.add({
			targets: gameFunctions.scrollBar,
			y: gameFunctions.config.yPosDown,
			duration: 500,
			ease: 'Power3'
		});   			
	})	
	
	//REDUCE CARD SIZE WHEN LEFT BUTTON RELEASED.
	//WHEN RIGHT BUTTON RELEASED, ROTATE CARD
	card.on('pointerup', function (pointer) {
        if (pointer.leftButtonReleased())
        {
			let data = {
				card_id: card.id,
				size: gameFunctions.config.cardSize
			}			
			connFunctions.requestSizeCard(socket, data)
	
			data = {
				roomID: gameFunctions.config.roomID
				,card_id: card.id
			}			
			connFunctions.requestGridSnapCard(socket, data)
			
			let max_height = gameFunctions.config.cardSize * (gameFunctions.config.tableHeight - 1);

			if (card.y >= max_height){
				// card.held = false;
				// card.placed = false;
				data = {
					card_id: card.id
				}							
				connFunctions.requestPalmCard(socket, data)
			}
		}
		
		if (pointer.rightButtonReleased())
        {
			let data = {
				card_id: card.id
			}			
			connFunctions.requestRotateCard(socket, data) 
		}
	})

		
	card.on('pointerover', function (pointer) {
        // console.log(card)
        if (gameFunctions.config.playerNumber === gameFunctions.config.currentPlayer)
        {
            // if (card.placed === false && card.held === false){
			if (card.held === false){
                gameFunctions.game.tweens.add({
                    targets: gameFunctions.scrollBar,
                    y: gameFunctions.config.yPosUp,
                    duration: 500,
                    ease: 'Power3'
                });    	
            }
        }
	})			
	
	
	// let card_number = deckFunctions.drawCard(data.deck_id);
	card.deck_id = data.deck_id;
	card.card_number = data.card_number;
	//IF CURRENT PLAYER THEN LOAD FRONT OF CARD, ELSE LOAD CARD BACK
	// console.log(gameFunctions.config.playerNumber)
	// console.log(gameFunctions.config.currentPlayer)
	if (gameFunctions.config.playerNumber === gameFunctions.config.currentPlayer)
	{	
		// console.log("card no: "+String(card.card_number))
		card.setFrame(card.card_number);
	}
	else {
		// console.log("card back: "+String(gameFunctions.card_back))
		card.setFrame(gameFunctions.config.card_back);
	}
		
    card.displayWidth = gameFunctions.config.cardSize;
    card.scaleY = card.scaleX;	
	card.orientation = 0;
	card.x_table_pos = -1;
	card.y_table_pos = -1;	
	
    card.owner = gameFunctions.config.currentPlayer;
	card.type = "card";	
	card.held = false;
	// card.placed = false;
	card.locked = false;
	card.depth = gameFunctions.config.depth_card_hand;	
	
	
	//SET CARD AS DRAGGABLE AND GIVE IT AN ID
    gameFunctions.game.input.setDraggable(card);
    card.id = gameFunctions.cards.length;	
	
	
	card.graphic = gameFunctions.game.add.graphics({
	x: card.x - card.width / 2,
	y: card.y - card.height / 2
	})
	.fillStyle(0xffff00, 0.75)
	.setTexture(card, undefined, 1)
	.fillRect(0, 0, card.width, card.height)
	.setDepth(gameFunctions.config.depth_card_table_graphic)

	card.graphic.visible = false;

	
    gameFunctions.cards.push(card);
	gameFunctions.hand.push(card.id);
    
	//ONCE THERES ONE CARD ADDED, ADD IN THE CARD UPDATE HANDLER
	if (gameFunctions.cards.length === 1)
	{	
		connFunctions.updateCards(socket)
	}
}



gameFunctions.checkCardLock = (card_id) => {
	let card = gameFunctions.cards[card_id];
	let last_card;
	
	//CHECK IF POSITION IS NEXT TO LAST CARD
	let touching = 0;
	let touch_direction = -1; //touching direction between last and new card 
	if(gameFunctions.config.last_card !== -1) //if there is a last card
	{
		last_card = gameFunctions.cards[gameFunctions.config.last_card];
		if (last_card.x_table_pos - 1 === card.x_table_pos || last_card.x_table_pos + 1 === card.x_table_pos){
			if (last_card.y_table_pos === card.y_table_pos){
				touching = 1;
				
				if(card.x_table_pos < last_card.x_table_pos){
					touch_direction = 3
				}
				if(card.x_table_pos > last_card.x_table_pos){
					touch_direction = 1
				}				
			}
		}
		// console.log("ypos: "+card.y_table_pos.toString() + " | id: "+card.id.toString())
		// console.log(card)
		if (last_card.y_table_pos - 1 === card.y_table_pos || last_card.y_table_pos + 1 === card.y_table_pos){
			if (last_card.x_table_pos === card.x_table_pos){
				touching = 1;
				
				if(card.y_table_pos < last_card.y_table_pos){
					touch_direction = 0
				}
				if(card.y_table_pos > last_card.y_table_pos){
					touch_direction = 2
				}								
			}
		}		
	}else{
		touching = -1;
	}
	
	console.log("touching: "+touching.toString())
	
	if (touching !== 0){
		//LOCK AND FLIP THE CARD
		
		let data = {
			roomName: gameFunctions.config.roomName
			,touching: touching
			,touch_direction: touch_direction
			,roomName: gameFunctions.config.roomName
			,pass_check: true		
			//CARD INFO
			,deck_id: card.deck_id
			,card_id: card.id
			,card_number: card.card_number
			,x_table_pos: card.x_table_pos
			,y_table_pos: card.y_table_pos
			,orientation: card.orientation			
		}
		if (last_card){
			//LAST CARD INFO
			data.last_deck_id = last_card.deck_id
			data.last_card_id = last_card.id
			data.last_card_number = last_card.card_number
			data.last_x_table_pos = last_card.x_table_pos
			data.last_y_table_pos = last_card.y_table_pos
			data.last_orientation = last_card.orientation			
		}
		
		connFunctions.requestCheckBoard(data);	
	}

}

gameFunctions.updateHandCards = () => {
	gameFunctions.hand.forEach((card_id, i) => {
        let card = gameFunctions.cards[card_id];

        if(card.held === false){					
            card.angle = 0;
            card.depth = gameFunctions.config.depth_card_hand;
    
            card.x = gameFunctions.scrollBar.x + (gameFunctions.config.handCardSize / 2) + (gameFunctions.config.handCardSize * i);
            card.y = gameFunctions.scrollBar.y;
            
            card.setScrollFactor(0); //make buttons non-scrollable
        }

	})	
}


gameFunctions.updateCardGraphics = () => {
	
	gameFunctions.cards.forEach((card, i) => {
		card.graphic.x = (card.x - (card.width * card.scaleX) / 2);
		card.graphic.y = (card.y - (card.height * card.scaleY) / 2);
		card.graphic.scaleX = card.scaleX;
		card.graphic.scaleY = card.scaleY;

		if (card.id === gameFunctions.config.last_card
		   && card.graphic.visible === false){
			card.graphic.visible = true;
			card.graphic.alpha = 0;

			gameFunctions.game.tweens.add({
			targets: card.graphic,
			alpha: 1,
			ease: 'Cubic.easeIn',  
			duration: 1500,
			repeat: -1,
			yoyo: true
			})					

		}

		if (card.id !== gameFunctions.config.last_card
		   && card.graphic.visible === true){

			card.graphic.visible = false;
			gameFunctions.game.tweens.killTweensOf(card.graphic);
		}				
	})
}