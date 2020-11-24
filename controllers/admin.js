const passport = require("passport");
const User = require("../models/user");



exports.getLanding = (req, res) => {
	res.render("landing");
}


exports.getFormRegisterUser = (req,res)=> {
	res.render("register");
}

exports.getFormLoginUser = (req,res) => {
	res.render("login");		
}


exports.createSelfUser = (req,res) => {

	// CHECK TO SEE IF THE USERNAME ALREADY EXISTS
	User.findOne({username: req.body.username}, function(err, user){
	
		if (err){
			req.flash("error", err.message);
			return res.redirect("/register")
		}		
		if(user) {
			req.flash("error", "Username already exists, please select a new one");
			return res.redirect("/register")			
		}

		User.register(
			new User({username: req.body.username, role:req.body.role}), req.body.password, function(err, user){
				if (err){
					// console.log(err)
					req.flash("error", err.message);
					return res.redirect("/register")
				}
				else{
					passport.authenticate("local")(req,res,function(){
						req.flash("success", "Welcome to Site " + user.username);
						res.redirect("/")
					})
				}
			});
	});
}

exports.loginUser = passport.authenticate("local", {
	successRedirect: "/",
	failureRedirect: "/login",
	failureFlash: true
})


exports.logoutUser = (req,res) => {
	req.logout();
	req.flash("success", "Logged you out!");
	res.redirect("/");
}


exports.createRoom = (req,res) => {
	res.render("create-room");		
}
