
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
    roomName: '',
    playerNumber: 0,
    currentPlayer: 0, //1
    last_card: -1,
    selected_card: -1,

    xPosUp: -1,
    yPosUp: -1
}



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