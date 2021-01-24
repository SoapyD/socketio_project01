const mongoose = require("mongoose");
// const User = require("../models/user");


const roomSchema = new mongoose.Schema({
	roomName: String
	,password: String
	,sockets: [String]
    ,users: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }]

	,author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		userName: String
    }

    ,decks: [[Number]]
    ,matrix: [[{
        deck_id : Number,
        card_id : Number,
        card_number : Number,
        orientation : Number
    }]]    

});


module.exports = mongoose.model("Room", roomSchema);