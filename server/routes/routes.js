const express = require("express");
const { makeApiRequest, getQuestion } = require("../controllers/keys");
const router = express.Router();

// Route to trigger API request
router.post("/request-api", makeApiRequest);

router.post("/questions", getQuestion);

module.exports = router;
