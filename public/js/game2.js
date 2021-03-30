


var character_form;


var GameScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function GameScene ()
    {
        Phaser.Scene.call(this, { key: 'GameScene' });
    },

    preload: function()
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
        

        
        // this.load.spritesheet("buttons", "./img/buttons3.jpg", 
        // { frameWidth: 100, frameHeight: 50, endFrame: 3 });	
        
        // this.load.html('character_form', './html/character_form.html');     
    },


    create: function()
    {
        this.input.mouse.disableContextMenu();

        // this.cameras.main.zoom = 2;
        this.input.on('wheel', function (pointer, gameObjects, deltaX, deltaY, deltaZ) {
            gameFunctions.game.cameras.main.zoom -= (deltaY / 100) * 0.1;

            if(gameFunctions.game.cameras.main.zoom <= 0.8){
                gameFunctions.game.cameras.main.zoom = 0.8
            }	
            if(gameFunctions.game.cameras.main.zoom >= 2){
                gameFunctions.game.cameras.main.zoom = 2
            }	

        });


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

        //SET BOUNDS TO THE CAMERA MOVEMENT
        this.cameras.main.setBounds(
            -gameFunctions.config.cardSize, 
            -gameFunctions.config.cardSize, 
            config.width + (gameFunctions.config.cardSize * 2), 
            config.height + (gameFunctions.config.cardSize * 2));

        
        //ADD THE CHARACTER SELECTION MENU
        // character_form = this.add.dom(this.cameras.main.centerX, y_origin).createFromCache('character_form');
        // character_form.setScrollFactor(0);
        // character_form.setPerspective(800);
        // character_form.setAlpha(0)
        // character_form.addListener('click');
        
        //ADD CLICK FUNCTIONALITY TO THE CHARACTER SELECTOR
        // character_form.on('click', function (event) {
        //     if (event.target.name === 'select')
        //     {
        //         var character = this.getChildByName('characters');

        //         let data = {
        //             roomID: gameFunctions.config.roomID,
        //             playerId: gameFunctions.config.playerNumber,
        //             character: character.value
        //         }
                    
        //         connFunctions.requestChangeCharacter(data)
            
        //     }

        //     if (event.target.name === 'start')
        //     {        
        //         gameFunctions.config.menu_state++;
        //     }
        // })	
        // gameFunctions.character_form = character_form
        
    },

    update: function (time, delta)
    {
        controls.update(delta);

        // console.log("loop")
        switch( gameFunctions.config.game_state) {
            case 0:
                gameFunctions.game = this;
                // connFunctions.startGameCheck(socket)
                connFunctions.updateGameElements();	
                connFunctions.changeCharacter();
                connFunctions.HideCharacterMenu();	            
                gameFunctions.config.game_state += 1;
            break;
            case 1:
                //GAME_STATE 1, waiting for game start
                // gameFunctions.config.game_state += 1;				
            break;
            
            case 2:
                //PRE-GAME MENU STATES
                // preGameMenuStates()
            break;
            
            case 3:
                this.input.dragDistanceThreshold = 16;			
                
                // gameFunctions.setupPlayers();
                /**/
                // gameFunctions.setupButtons();
                // connFunctions.updateGameElements();			
                gameFunctions.createScrollBar();			
                // console.log("TEST")
                gameFunctions.config.game_state += 1;
            break;
                
            case 4:
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
                
            case 5:
                gameFunctions.updateHandCards();
                
                gameFunctions.updateCardGraphics();
            break;			
            default:
            // code block
        }	
                    
    }
});


function preGameMenuStates() {
	// console.log("loop")
	switch( gameFunctions.config.menu_state) {
		case 0:
			//FADE THE CHARACTER PICKER INTO VIEW
			gameFunctions.game.tweens.add({
                targets: character_form,
                // y: this.cameras.main.centerY,
                alpha: 1,
                duration: 500,
                ease: 'Power3',
                onComplete: function ()
                {
                    character_form.setVisible(true);
                }
                });    

            gameFunctions.config.menu_state++;
        break;		
        case 1:
            //WAIT FOR PLAYERS TO SELECT CHARACTER AND TO START GAME 
        break;	
        
        case 2:
            // console.log(character_box.text)
            connFunctions.requestHideCharacterMenu();            
            connFunctions.requestAdvanceGameState();
        break;	

        default:
        // code block
    }	               
}




var UIScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function UIScene ()
    {
        Phaser.Scene.call(this, { key: 'UIScene', active: true });
    },

    preload: function()
    {

        this.load.spritesheet("buttons", "./img/buttons3.jpg", 
        { frameWidth: 100, frameHeight: 50, endFrame: 3 });	
        
        this.load.html('character_form', './html/character_form.html');     
    },


    create: function()
    {
        this.input.mouse.disableContextMenu();


        let x_origin = this.cameras.main.centerX	
        let y_origin = this.cameras.main.centerY	

        
        //ADD THE CHARACTER SELECTION MENU
        character_form = this.add.dom(this.cameras.main.centerX, y_origin).createFromCache('character_form');
        character_form.setScrollFactor(0);
        character_form.setPerspective(800);
        character_form.setAlpha(0)
        character_form.addListener('click');
        
        //ADD CLICK FUNCTIONALITY TO THE CHARACTER SELECTOR
        character_form.on('click', function (event) {
            if (event.target.name === 'select')
            {
                var character = this.getChildByName('characters');

                let data = {
                    roomID: gameFunctions.config.roomID,
                    playerId: gameFunctions.config.playerNumber,
                    character: character.value
                }
                    
                connFunctions.requestChangeCharacter(data)
            
            }

            if (event.target.name === 'start')
            {        
                gameFunctions.config.menu_state++;
            }
        })	
        gameFunctions.character_form = character_form
        

        gameFunctions.UI_scene = this.scene.get('UIScene');
    },

    update: function (time, delta)
    {

        // console.log("loop")
        switch( gameFunctions.config.game_state) {
            case 0:

            break;
            case 1:
                //GAME_STATE 1, waiting for game start
                // gameFunctions.config.game_state += 1;			
            break;
            
            case 2:
                //PRE-GAME MENU STATES
                preGameMenuStates()
            break;
            
            case 3:
                gameFunctions.setupButtons();
            break;

            default:
            // code block
        }	
                    
    }
});









// const gameFunctions = require('/js/gameFunctions');

var config = {
    type: Phaser.AUTO,
    width: gameFunctions.config.cardSize * gameFunctions.config.tableWidth, //800,
	height: gameFunctions.config.cardSize * gameFunctions.config.tableHeight, //600,
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
      scene: [ GameScene, UIScene ]     
};

var game = new Phaser.Game(config);