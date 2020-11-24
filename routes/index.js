const express = require("express");
const router = express.Router();
// const passport = require("passport");
const adminController = require('../controllers/admin');
const middleware = require("../middleware");

// const User = require("../models/user");


router.get("/", adminController.getLanding)

router.get("/register", adminController.getFormRegisterUser)

router.post("/register", adminController.createSelfUser)

router.get("/login", adminController.getFormLoginUser)

router.post("/login", adminController.loginUser)

router.get("/logout", adminController.logoutUser)

router.get("/create-room", middleware.isLoggedIn, adminController.createRoom)



module.exports = router;