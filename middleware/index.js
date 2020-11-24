
// const Campground = require("../models/campground"),
// Comment = require("../models/comment");

let middlewareObj = {};

// middlewareObj.isCampGroundOwnership = function(req, res, next) {
// //is user logged in at all
// if (req.isAuthenticated()){

//     Campground.findById(req.params.id).exec(function(err, campground){
//         if(err){
//             // console.log("Couldn't run 'find' function");
//             req.flash("error", "Campground not found");
//             res.redirect("back");
//         } else{
            
//             if (campground.author.id.equals(req.user._id))
//             {					
//                 return next();
//             }
//             else{
//                 // res.send("you can't edit what you didn't create");
//                 req.flash("error", "You don't have permission to do that");
//                 res.redirect("back")
//             }
//         }
//     });		
    
// } else{
//     // console.log("you need to be logged in to do that");
//     // res.send("you need to be logged in to do that");
//     req.flash("error", "You need to be logged in to do that");
//     res.redirect("back")
// }		
// }

// middlewareObj.isCommentOwnership = function(req, res, next) {
// //is user logged in at all
// if (req.isAuthenticated()){

//     Comment.findById(req.params.comment_id).exec(function(err, comment){
//         if(err){
//             req.flash("error", "Comment not found");
//             res.redirect("back");				
//         } else{
            
//             if (comment.author.id.equals(req.user._id))
//             {					
//                 return next();
//             }
//             else{
//                 req.flash("error", "You don't have permission to do that");
//                 res.redirect("back")
//             }
//         }
//     });		
    
// } else{
//     req.flash("error", "You need to be logged in to do that");
//     res.redirect("back")
// }		
// }

middlewareObj.isLoggedIn = function(req, res, next){
if(req.isAuthenticated()){
    return next();
}
req.flash("error", "You need to be logged in to do that");
res.redirect("/login")
}


module.exports = middlewareObj