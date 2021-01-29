
// const address = 'https://soaps-card-game.azurewebsites.net';
// const address = 'http://localhost:3000/admin';


const address = 'https://node-v12-ubyor.run-eu-central1.goorm.io';
// const address = 'http://localhost:3000';
const socket = io(address)

$('#message-input').slideUp(0);

const connFunctions = [];


//    #    ######  #     # ### #     # 
//   # #   #     # ##   ##  #  ##    # 
//  #   #  #     # # # # #  #  # #   # 
// #     # #     # #  #  #  #  #  #  # 
// ####### #     # #     #  #  #   # # 
// #     # #     # #     #  #  #    ## 
// #     # ######  #     # ### #     # 


connFunctions.checkMessages = (socket) => {
        
    // document.querySelector('#message-form').addEventListener('submit', (event) => {
    $(document).on('click', '#create', (event) => {         

        event.preventDefault() 

        const data = {
            roomName: document.querySelector('#roomName').value,
            password: document.querySelector('#password').value,
            userName: document.querySelector('#userName').value,
            userID: document.querySelector('#userID').value               
        }
        socket.emit('createRoom', data)
    })

    $(document).on('click', '#join', (event) => {         

        event.preventDefault()
        const data = {
            roomName: document.querySelector('#roomName').value,
            password: document.querySelector('#password').value,
            userName: document.querySelector('#userName').value,
            userID: document.querySelector('#userID').value               
        }
        socket.emit('joinRoom', data)
    })    

    function sendMessage(event){
        event.preventDefault()
        let data = {
            roomName: document.querySelector('#roomName').value,
            text: document.querySelector('#fname').value
        }
        //CLEAR TEXT
        document.querySelector('#fname').value = "";
        // console.log("TEST")
        socket.emit('MessageToServer', data)        
    }

    $(document).on('click', '#submit-message', (event) => {
        sendMessage(event)         
    })   

    $(document).on('keypress', (event) => {
        if(event.which == 13) {
            console.log("test")
            sendMessage(event) 
        }
    });

    socket.on('roomInfo', (data) => {
		gameFunctions.config.roomName = data.roomName
		gameFunctions.config.roomID = data.roomID	
		gameFunctions.config.playerNumber = data.playerNumber
		
        const messages = document.querySelector('#messages'); 
        messages.insertAdjacentHTML("beforeend", "<li>'"+data.userName+"' has been added as Player #"+data.playerNumber+" to room '"+data.roomName+"'</li>");		        
        $('#message-form').slideToggle(1000);
        $('#message-input').slideDown(1000);
        // gameFunctions.config.game_state += 1;
    })

    socket.on('roomMessage', (data) => {
        const messages = document.querySelector('#messages'); 
        messages.insertAdjacentHTML("beforeend", "<li>'"+data.userName+"' has been added as Player #"+data.playerNumber+" to room '"+data.roomName+"'</li>");		        
    })

    socket.on('startGame', (data) => {
        
        // if(data.usersNumber === 1)
        // {
        //     $('#start-button').removeClass('hidden');
        // }
		gameFunctions.config.game_state += 1;
    })	

    socket.on('joinFailed', (data) => {
        const messages = document.querySelector('#messages'); 
        messages.insertAdjacentHTML("beforeend", "<li>'"+data+"'</li>");		
    })	


    socket.on('MessageFromServer', (message) => {
        const messages = document.querySelector('#messages'); 
        messages.insertAdjacentHTML("beforeend", "<li>"+message+"</li>");
    })


    socket.on('CreateCard', (data) => {
        // console.log("create card")
		gameFunctions.createCard(data);
	})    	    

}        

connFunctions.checkMessages(socket)




//  #####   #####  ######  ####### #       #       ######     #    ######  
// #     # #     # #     # #     # #       #       #     #   # #   #     # 
// #       #       #     # #     # #       #       #     #  #   #  #     # 
//  #####  #       ######  #     # #       #       ######  #     # ######  
//       # #       #   #   #     # #       #       #     # ####### #   #   
// #     # #     # #    #  #     # #       #       #     # #     # #    #  
//  #####   #####  #     # ####### ####### ####### ######  #     # #     # 


connFunctions.updateGameElements = () => {
	socket.on('MoveScrollbar', (data) => {
		gameFunctions.scrollBar.x = data.x
	})	
}


connFunctions.requestMoveScrollbar = (params, data) => {
	if (gameFunctions.config.playerNumber === gameFunctions.config.currentPlayer)
	{	
    	socket.emit('requestMoveScrollbar', data)
	}
}



//  #####     #    ######  ######   #####  
// #     #   # #   #     # #     # #     # 
// #        #   #  #     # #     # #       
// #       #     # ######  #     #  #####  
// #       ####### #   #   #     #       # 
// #     # #     # #    #  #     # #     # 
//  #####  #     # #     # ######   ##### 

connFunctions.updateCards = (socket) => {

	
    //READ THE MOUSE MOVEMENT DATA AND APPLY IT
    if (gameFunctions.cards.length > 0)
    {
        socket.on('MoveCard', (data) => {
			
            let card = gameFunctions.cards[data.cards_array_id];
			
			if (card.locked === false){
				card.x = data.mouseX
				card.y = data.mouseY				
			}

			card.held = true;
            card.depth = gameFunctions.config.depth_card_held;
			
			//SET ANY OTHER CARD THAT'S HELD BUT NOT LOCKED BACK TO DEFAULT SO IT APPEARS IN THE HAND AGAIN
			gameFunctions.hand.forEach((cards_array_id, i) => {
				let card = gameFunctions.cards[cards_array_id];
				
				if(card.held === true && card.locked === false && card.id !== gameFunctions.config.selected_card){					
					card.held = false;
				}
			})									
			
			//NEED TO BE HERE SO THE ABOVE CODE DOEN'T RESET THE HELD STATUS OF THE CARD
            gameFunctions.config.selected_card = data.cards_array_id;
        })	
		
        socket.on('RotateCard', (data) => {
            let card = gameFunctions.cards[data.cards_array_id];
            let next_angle = card.angle;
			if(card.locked === false){
                // card.angle += 90;
                next_angle += 90

                //Add TWEEN
				gameFunctions.game.tweens.add({
					targets: card,
					angle: next_angle,
					duration: 500,
					ease: 'Power3'
				});    	

                
			}
			
			switch(next_angle) {
				case 0:
					card.orientation = 0; //0
					break;
				case 90:
					card.orientation = 1; //90
					break;	
				case -180:
					card.orientation = 2; //180
					break;
				case -90:
					card.orientation = 3; //270
					break;				
				default:
			}
        })	
		
        socket.on('SizeCard', (data) => {
            let card = gameFunctions.cards[data.cards_array_id];
			
			if(card.locked === false){
				// card.displayWidth = data.size;
                // card.scaleY = card.scaleX;	
                
				gameFunctions.game.tweens.add({
					targets: card,
                    displayWidth: data.size,
                    displayHeight: data.size,
                    // scaleY: gameFunctions.cards[data.card_id].scaleX,
					duration: 200,
					ease: 'Power3'
				});  

			}
        })	
		
        socket.on('GridSnapCard', (data) => {
            let card = gameFunctions.cards[data.cards_array_id];
			
			if(card.locked === false){
				card.setScrollFactor(1); //make buttons scrollable

				card.x_table_pos = data.card_x_table_pos;
				card.y_table_pos = data.card_y_table_pos;				
				card.x = data.card_x;
				card.y = data.card_y;			
			}
			card.depth = gameFunctions.config.depth_card_table;
			gameFunctions.config.selected_card = data.cards_array_id;
        })		
		
		socket.on('PalmCard', (data) => {
			let card = gameFunctions.cards[data.cards_array_id];
			card.held = false;
			gameFunctions.config.selected_card = -1;


			if (gameFunctions.config.playerNumber === gameFunctions.config.currentPlayer)
			{			
				gameFunctions.game.tweens.add({
					targets: gameFunctions.scrollBar,
					y: gameFunctions.config.yPosUp,
					duration: 500,
					ease: 'Power3'
				});    			
			}

		})				
		
		socket.on('LockCard', (data) => {
			let card = gameFunctions.cards[data.cards_array_id];
			
			// gameFunctions.config.last_card = data.cards_array_id
			card.locked = true;
			card.setScrollFactor(1);
			card.setFrame(card.card_id);

			//REMOVE THE CARD FROM THE HAND
			gameFunctions.hand.forEach((h_card_id, i, object) => {
				if(h_card_id === card.id){	
					object.splice(i, 1);
				}
			})	
			
			gameFunctions.config.last_card = card.id;
			
			// gameFunctions.game.cameras.main.scrollX = card.x - ((gameFunctions.tableWidth * gameFunctions.cardSize) / 2);
			// gameFunctions.game.cameras.main.scrollY = card.y - ((gameFunctions.tableHeight * gameFunctions.cardSize) / 2);							
		})				
		
    }		
} 




connFunctions.requestCreateCard = (params) => {
	if (gameFunctions.config.playerNumber === gameFunctions.config.currentPlayer)
	{
		let data = params;
		data.roomName = gameFunctions.config.roomName
		data.roomID = gameFunctions.config.roomID
			
    	socket.emit('requestCreateCard', data)
	}
}


connFunctions.requestRotateCard = (socket, data) => {
	if (gameFunctions.config.playerNumber === gameFunctions.config.currentPlayer)
	{
    	socket.emit('requestRotateCard', data)
	}
}

connFunctions.requestMoveCard = (socket, data) => {
	//SEND OUT THE MOUSE MOVEMENT DATA
	if (gameFunctions.config.playerNumber === gameFunctions.config.currentPlayer)
	{	
		socket.emit('requestMoveCard', data)
	}
}        

connFunctions.requestSizeCard = (socket, data) => {
	if (gameFunctions.config.playerNumber === gameFunctions.config.currentPlayer)
	{
		socket.emit('requestSizeCard', data)
	}
}        

connFunctions.requestGridSnapCard = (socket, data) => {
	if (gameFunctions.config.playerNumber === gameFunctions.config.currentPlayer)
	{
		socket.emit('requestGridSnapCard', data)
	}
}        

connFunctions.requestPalmCard = (socket, data) => {
	if (gameFunctions.config.playerNumber === gameFunctions.config.currentPlayer)
	{
		socket.emit('requestPalmCard', data)
	}
}        


connFunctions.requestLockCard = () => {
	
	if (gameFunctions.config.playerNumber === gameFunctions.config.currentPlayer)
	{	
		if (gameFunctions.cards.length > 0 && gameFunctions.config.selected_card !== -1)
		{	
			let card = gameFunctions.cards[gameFunctions.config.selected_card];
			//SEND OUT THE MOUSE MOVEMENT DATA
			let data = {
				roomID: gameFunctions.config.roomID	
				,cards_array_id: card.id
				,card_orientation: card.orientation
			}
			socket.emit('requestLockCard', data)
		}
	}
}        

connFunctions.requestMoveScrollbar = (params, data) => {
	if (gameFunctions.config.playerNumber === gameFunctions.config.currentPlayer)
	{	
    	socket.emit('requestMoveScrollbar', data)
	}
}

connFunctions.requestChangePlayer = (params) => {
	if (gameFunctions.config.playerNumber === gameFunctions.config.currentPlayer)
	{	
    	socket.emit('requestChangePlayer')
	}
}