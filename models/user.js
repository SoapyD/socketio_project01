const mongoose = require("mongoose"),
	passportLocalMongoose = require("passport-local-mongoose");


const userSchema = new mongoose.Schema({
	userName: String,
	password: String,
	role: String
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);