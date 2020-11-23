
// const address = 'https://node-v12-ubyor.run-eu-central1.goorm.io';
const address = 'https://soaps-card-game.azurewebsites.net';
// const address = 'http://localhost:3000';
// const address = 'http://localhost:3000/admin';
const socket = io(address)


// exports.joinRoom = (socket, data) => {

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


exports.checkMessages = (socket) => {
    socket.on('messageFromServer', (message) => {
            console.log(message.text)
            console.log(`my id is: ${socket.id}`)
    })
        
    document.querySelector('#message-form').addEventListener('submit', (event) => {
            event.preventDefault()
            // console.log("Form Submitted")
            const newMessage = document.querySelector('#user-message').value;    
            socket.emit('newMessageToServer', {text: newMessage})
    })
    
    socket.on('newMessageFromServer', (message) => {
            // console.log(message.text)
            const messages = document.querySelector('#messages'); 
            messages.insertAdjacentHTML("beforeend", "<li>"+message.text+"</li>");
    })

    socket.on('joined', (message) => {
        console.log(message)
    })

}        


exports.checkMessages(socket)

