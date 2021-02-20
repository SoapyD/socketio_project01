// const gameFunctions = require('/js/gameFunctions');

var config = {
    type: Phaser.AUTO,
    width: 800,
	height: 600,
	// width: window.innerWidth,
	// height: window.innerHeight,	
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    // scene: {
    //     preload: preload,
    //     create: create
    // },
	
	parent: 'gameContainer',
    dom: {
        createContainer: true
    },	
	
    scale: {
          
        mode: Phaser.Scale.FIT,
        // mode: Phaser.DOM.FIT,
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
	// this.load.image('card', './img/card.png');
	
	this.load.spritesheet("a2", "./img/cards/a2.png", 
	 { frameWidth: 350, frameHeight: 350, endFrame: 16 });	

	this.load.spritesheet("s2", "./img/cards/s2.png", 
	 { frameWidth: 350, frameHeight: 350, endFrame: 16 });		

	this.load.spritesheet("p2", "./img/cards/p2.png", 
	 { frameWidth: 350, frameHeight: 350, endFrame: 16 });		

	this.load.spritesheet("f2", "./img/cards/f2.png", 
	 { frameWidth: 350, frameHeight: 350, endFrame: 16 });		
	
	this.load.spritesheet("c2", "./img/cards/c2.png", 
	 { frameWidth: 350, frameHeight: 350, endFrame: 16 });	
	
	
	// this.load.html('nameform', 'setup2.html');
	
	this.load.spritesheet("buttons", "./img/buttons3.jpg", 
     { frameWidth: 100, frameHeight: 50, endFrame: 3 });	
     
     this.load.html('nameform', './html/setup.html');     
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


    //Create a camera controller using the arraow keys
    var cursors = this.input.keyboard.createCursorKeys();

    var controlConfig = {
        camera: this.cameras.main,
        left: cursors.left,
        right: cursors.right,
        up: cursors.up,
        down: cursors.down,
        acceleration: 0.04,
        drag: 0.0005,
        maxSpeed: 0.7
    };

    controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);

    this.cameras.main.setBounds(
        -gameFunctions.config.cardSize, 
        -gameFunctions.config.cardSize, 
        config.width + (gameFunctions.config.cardSize * 2), 
        config.height + (gameFunctions.config.cardSize * 2));

    

    element = this.add.dom(this.cameras.main.centerX, y_origin).createFromCache('nameform');
	element.setPerspective(800);
	element.setAlpha(0)
	element.addListener('click');
	
	element.on('click', function (event) {
        if (event.target.name === 'start')
        {
            var character = this.getChildByName('characters');
			console.log(character.value)
			
			this.scene.tweens.add({
			targets: element,
			// y: this.cameras.main.centerY,
			alpha: 0,
			duration: 500,
			ease: 'Power3',
			onComplete: function ()
			{
				element.setVisible(false);
			}
			});       			
			
		}
	})
	
	
	this.tweens.add({
	targets: element,
	// y: this.cameras.main.centerY,
	alpha: 1,
	duration: 500,
	ease: 'Power3'
	});       



}

function update (time, delta)
{
    controls.update(delta);

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
			
			// gameFunctions.setupPlayers();
			/**/
			gameFunctions.setupButtons();
			connFunctions.updateGameElements();			
			gameFunctions.createScrollBar();			
			// console.log("TEST")
			gameFunctions.config.game_state += 1;
		break;
		case 3:
			//SETUP GAME LOOP
            gameFunctions.hand = []; //RESET THE HAND
            gameFunctions.config.selected_card = -1;
            
            if(gameFunctions.cards)
            {
                gameFunctions.cards.forEach((card, i) => {
                    if (card.locked === false)
                    {
                        if (gameFunctions.config.currentPlayer === card.owner)
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
			gameFunctions.config.game_state += 1;						
		break;        
		case 4:
			gameFunctions.updateHandCards();
			
			gameFunctions.updateCardGraphics();
		break;			
		default:
		// code block
	}	
				
}
