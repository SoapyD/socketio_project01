const express = require("express");
const router = express.Router();
// const passport = require("passport");
const adminController = require('../controllers/admin');

// const User = require("../models/user");


router.get("/", adminController.getLanding)


module.exports = router;