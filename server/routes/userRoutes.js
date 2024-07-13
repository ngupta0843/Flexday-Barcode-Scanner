const express = require("express");
const {login, signup} = require("../controllers/users");
const router = express.Router();


router.post("/users/login", login);

router.post("/users/signup", signup);

module.exports = router;
