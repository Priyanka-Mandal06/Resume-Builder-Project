const express = require("express");
const { register, login } = require("../controllers/auth.controller");

const router = express.Router();

// register user
router.post("/register", register);

// login user
router.post("/login", login);

module.exports = router;
