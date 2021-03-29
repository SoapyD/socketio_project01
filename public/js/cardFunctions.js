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
					cards_array_id: gameObject.id,
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
				cards_array_id: card.id,
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
				cards_array_id: card.id,
				size: gameFunctions.config.cardSize
			}			
			connFunctions.requestSizeCard(socket, data)
	
			data = {
				roomID: gameFunctions.config.roomID
				,cards_array_id: card.id
				,card_x: card.x
				,card_y: card.y
				
			}			
			connFunctions.requestGridSnapCard(socket, data)
			
			
			let max_height = gameFunctions.config.cardSize * (gameFunctions.config.tableHeight - 1);

			if (card.y >= max_height){
				// card.held = false;
				// card.placed = false;
				data = {
					cards_array_id: card.id
				}							
				connFunctions.requestPalmCard(socket, data)
			}
		}
		
		if (pointer.rightButtonReleased())
        {
			let data = {
				roomID: gameFunctions.config.roomID
				,cards_array_id: card.id
				,angle: card.angle
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
	card.card_id = data.card_id;
	//IF CURRENT PLAYER THEN LOAD FRONT OF CARD, ELSE LOAD CARD BACK
	// console.log(gameFunctions.config.playerNumber)
	// console.log(gameFunctions.config.currentPlayer)
	if (gameFunctions.config.playerNumber === gameFunctions.config.currentPlayer)
	{	
		// console.log("card no: "+String(card.card_number))
		card.setFrame(card.card_id);
	}
	else {
		// console.log("card back: "+String(gameFunctions.card_back))
		card.setFrame(gameFunctions.config.card_back);
	}
		
    card.displayWidth = gameFunctions.config.handCardSize;
    card.scaleY = card.scaleX;	
	card.orientation = 0;
	card.x_table_pos = -1;
    card.y_table_pos = -1;	
    // card.next_angle = 0;
	
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
    
    return card;
}



gameFunctions.updateHandCards = () => {
	gameFunctions.hand.forEach((cards_array_id, i) => {
        let card = gameFunctions.cards[cards_array_id];

        if(card.held === false){					
            card.angle = 0;
            card.depth = gameFunctions.config.depth_card_hand;
    
            card.displayWidth = gameFunctions.config.handCardSize;
            card.scaleY = card.scaleX;	

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
			// console.log("triggered")
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