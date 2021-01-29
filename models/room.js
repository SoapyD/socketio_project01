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

	,max_players: Number
	,current_player: {type: Number, default: 0}
	
	
	,config: {
		cardSize: Number
		,handCardSize: Number
		,largeCardSize: Number
		,tableWidth: Number
		,tableHeight: Number
		,card_back: Number

		,depth_card_table: Number
		,depth_card_table_graphic: Number
		,depth_card_hand: Number
		,depth_card_held: Number		
	}
	
	,cards: [{
		deck_id: Number
        ,card_id: Number
        ,card_type: String
        ,locked: Boolean
		,x: {type: Number, default: 0}
		,y: {type: Number, default: 0}		
		,x_table_pos: {type: Number, default: 0}
		,y_table_pos: {type: Number, default: 0}		
	}]
	,selected_card: {type: Number, default: -1}
	,last_card: {type: Number, default: -1}
	
    ,decks: [[Number]]
    ,matrix: [[{
        deck_id : Number,
        card_id : Number,
        cards_array_id : Number,
        orientation : Number
    }]]    

   ,created_date: {type: Date, default: Date.now}
   ,updateddate: {type: Date, default: Date.now}	
	
});


module.exports = mongoose.model("Room", roomSchema);