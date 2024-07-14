const express = require("express");
const { makeApiRequest, getQuestion } = require("../controllers/keys");
const router = express.Router();
const authenticateToken = require("../middleware/auth");

// Route to trigger API request
router.post("/request-api", authenticateToken, makeApiRequest);

router.post("/questions", authenticateToken, getQuestion);

module.exports = router;
