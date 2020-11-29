// const gameFunctions = require('/js/gameFunctions');

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: {
        preload: preload,
        create: create
    },
    scale: {
        parent: 'gameContainer',  
        // mode: Phaser.Scale.FIT,
        // autoCenter: Phaser.Scale.AUTO,
      },
      scene: {
		preload: preload,
		create: create,
		update: update
	}      
};

var game = new Phaser.Game(config);

function preload ()
{

}

var element;


function create ()
{
	this.input.mouse.disableContextMenu();
	
	let x_origin = this.cameras.main.centerX	
	let y_origin = this.cameras.main.centerY	

	this.add.grid(
		x_origin, y_origin, 
		config.width,// + (gameFunctions.cardSize * 2), 
		config.height,// + (gameFunctions.cardSize * 2), 
		gameFunctions.config.cardSize, 
		gameFunctions.config.cardSize, 
		0x00b9f2).setAltFillStyle(0x016fce).setOutlineStyle(0x000000);
}

function update ()
{
	// console.log("loop")
	switch( gameFunctions.config.game_state) {
		case 0:
			gameFunctions.game = this;
			// connFunctions.startGameCheck(socket)
			gameFunctions.config.game_state += 1;
		break;
		case 1:
			//GAME_STATE 1, waiting for game start
			// gameFunctions.config.game_state += 1;
		break;
		
		
		case 2:
            this.input.dragDistanceThreshold = 16;			
            /*
            let callbackParams = {};
			gameFunctions.createButton(this, 50, this.cameras.main.centerY - 25, "lock card", connFunctions.requestLockCard, callbackParams, gameFunctions.btn_sprite);			
			gameFunctions.createButton(this, 50, this.cameras.main.centerY + 25, "end turn", connFunctions.requestChangePlayer, callbackParams, gameFunctions.btn_sprite);
            
			
			let far_left = gameFunctions.tableWidth * gameFunctions.cardSize;
			
			callbackParams = {
				roomName: gameFunctions.roomName,
				deck_id: 0,
				card_type: "a2"	
			}
            gameFunctions.createButton(this, far_left- 50, this.cameras.main.centerY - 100, "armour", connFunctions.requestCreateCard, callbackParams, gameFunctions.btn_sprite);
			
			callbackParams = {
				roomName: gameFunctions.roomName,				
				deck_id: 1,
				card_type: "s2"	
			}			
            gameFunctions.createButton(this, far_left- 50, this.cameras.main.centerY - 50, "speed", connFunctions.requestCreateCard, callbackParams, gameFunctions.btn_sprite);
            
			callbackParams = {
				roomName: gameFunctions.roomName,				
				deck_id: 2,
				card_type: "p2"	
			}			
			gameFunctions.createButton(this, far_left- 50, this.cameras.main.centerY, "physical", connFunctions.requestCreateCard, callbackParams, gameFunctions.btn_sprite);
            
			callbackParams = {
				roomName: gameFunctions.roomName,				
				deck_id: 3,
				card_type: "f2"	
			}			
			gameFunctions.createButton(this, far_left- 50, this.cameras.main.centerY + 50, "focus", connFunctions.requestCreateCard, callbackParams, gameFunctions.btn_sprite);			
            
			callbackParams = {
				roomName: gameFunctions.roomName,				
				deck_id: 4,
				card_type: "c2"	
			}			
			gameFunctions.createButton(this, far_left- 50, this.cameras.main.centerY + 100, "cheat", connFunctions.requestCreateCard, callbackParams, gameFunctions.btn_sprite);			
			
			gameFunctions.btn_sprite.forEach(btn => {
				gameFunctions.buttonPress(btn, btn.clickAction, btn.callbackParams);                    
			})			
			
			gameFunctions.setupPlayers();
			*/
			connFunctions.updateGameElements();			
			gameFunctions.createScrollBar();			
			// console.log("TEST")
			gameFunctions.config.game_state += 1;
		break;
		/*
		case 3:
            //SETUP GAME LOOP
            gameFunctions.hand = []; //RESET THE HAND
            gameFunctions.selected_card = -1;
            
            if(gameFunctions.cards)
            {
                gameFunctions.cards.forEach((card, i) => {
                    if (card.locked === false)
                    {
                        if (gameFunctions.currentPlayer === card.owner)
                        {		   
                            card.setActive(true);
                            card.setVisible(true);    
                            
                            gameFunctions.hand.push(card.id)
                        }
                        else 
                        {
                            card.setActive(false);
                            card.setVisible(false);
                        }
                    }
                })	
            }
			gameFunctions.game_state += 1;						
		break;        
		case 4:
			gameFunctions.updateHandCards();
			
			gameFunctions.updateCardGraphics();
			break;			
			*/
		default:
		// code block
	}	
				
}
