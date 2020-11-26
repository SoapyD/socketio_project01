const Room = require("../models/room");

exports.seedDB = () => {
   //Remove all products
   Room.remove({}, function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log("removed rooms!");
        }
	   
    }); 
    //add a few comments
}