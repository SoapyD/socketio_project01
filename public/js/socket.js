
// const address = 'https://node-v12-ubyor.run-eu-central1.goorm.io';
// const address = 'https://soaps-card-game.azurewebsites.net';
const address = 'http://localhost:3000';
// const address = 'http://localhost:3000/admin';
const socket = io(address)

$('#message-input').slideUp(0);

const connFunctions = [];

// connFunctions.joinRoom = (socket, data) => {

//     socket.emit('joinRoom', data)	

//     socket.on('roomInfo', (data) => {
// 		gameFunctions.playerNumber = data.playerNumber
//         gameFunctions.roomName = data.roomName
// 		gameFunctions.userName = data.userName
// 		gameFunctions.usersNumber = data.usersNumber


// 		const messages = document.querySelector('#messages'); 
//         messages.insertAdjacentHTML("beforeend", "<li>'"+gameFunctions.userName+"' has been added as Player #"+gameFunctions.playerNumber+" to room '"+gameFunctions.roomName+"'</li>");		
        
//     })		
// }    


connFunctions.checkMessages = (socket) => {
        
    // document.querySelector('#message-form').addEventListener('submit', (event) => {
    $(document).on('click', '#create', (event) => {         

        event.preventDefault()
        // if(event.preventDefault){ 
        //     event.preventDefault()
        // }
        // else{
        //     event.stop()
        //     event.returnValue = false;
        // };        

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

    $(document).on('click', '#submit-message', (event) => {         

        event.preventDefault()
        let data = {
            roomName: document.querySelector('#roomName').value,
            text: document.querySelector('#fname').value
        }
        // console.log("TEST")
        socket.emit('MessageToServer', data)
    })   

    // socket.on('joined', (message) => {
    //     console.log(message)
    //     const messages = document.querySelector('#messages'); 
    //     messages.insertAdjacentHTML("beforeend", "<li>'"+socket.id+"'</li>");	        
    // })

    socket.on('roomInfo', (data) => {
        const messages = document.querySelector('#messages'); 
        messages.insertAdjacentHTML("beforeend", "<li>'"+data.userName+"' has been added as Player #"+data.playerNumber+" to room '"+data.roomName+"'</li>");		        
        $('#message-form').slideToggle(1000);
        $('#message-input').slideDown(1000);
    })

    socket.on('roomMessage', (data) => {
        const messages = document.querySelector('#messages'); 
        messages.insertAdjacentHTML("beforeend", "<li>'"+data.userName+"' has been added as Player #"+data.playerNumber+" to room '"+data.roomName+"'</li>");		        
    })

    socket.on('checkStart', (data) => {
        
        if(data.usersNumber === 1)
        {
            // const start_btn = document.querySelector('#start-button');
            // start_btn.to
            $('#start-button').removeClass('hidden');
        }	
    })	

    socket.on('joinFailed', (data) => {
        const messages = document.querySelector('#messages'); 
        messages.insertAdjacentHTML("beforeend", "<li>'"+data+"'</li>");		
    })	



    // socket.on('messageFromServer', (message) => {
    //     console.log(message.text)
    //     console.log(`my id is: ${socket.id}`)
    // })    

    socket.on('MessageFromServer', (message) => {
        const messages = document.querySelector('#messages'); 
        messages.insertAdjacentHTML("beforeend", "<li>"+message+"</li>");
    })



}        


connFunctions.checkMessages(socket)

