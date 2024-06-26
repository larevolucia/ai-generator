// functions/getApiKey.js
require("dotenv").config();

exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      apiKey: process.env.AI_APP_SHECODES_API_KEY
    })
  };
};
