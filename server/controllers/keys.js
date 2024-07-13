const axios = require("axios");
const qs = require("qs");
const dotenv = require("dotenv");
dotenv.config();

//Default question
let userQuestion = "What are my maternity benefits?";

const config = {
  grant_type: process.env.GRANT_TYPE,
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  scope: process.env.SCOPE,
};

const options = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
};

//TODO decrease number of API calls by having this refresh every hour, and then saving api key to database instead of calling every time in makeAPIRequest
async function getAccessToken() {
  try {
    const tokenResponse = await axios.post(
      process.env.TOKEN_LINK,
      qs.stringify(config),
      options
    );
    console.log("key generated");
    return tokenResponse.data.access_token;
  } catch (error) {
    console.error("Error obtaining access token:", error);
    throw error;
  }
}

async function makeApiRequest(req, res) {
  try {
    console.log("function called");
    console.log('question: ', userQuestion);
    const accessToken = await getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    const baseURL = process.env.SPECIPHIC_BASE_URL;
    const response = await axios.post(
      `${baseURL}?q=${encodeURIComponent(userQuestion)}&metadata=true`,
      {},
      { headers }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error making API request:", error);
    res.status(500).send("Failed to make API request");
  }
}

const getQuestion = async (req, res) => {
  try {
    userQuestion = req.body.question;
    res.send("Question received");
  }
  catch (error){
    console.loge(error)
  }
}

module.exports = {
  makeApiRequest,
  getQuestion,
};
