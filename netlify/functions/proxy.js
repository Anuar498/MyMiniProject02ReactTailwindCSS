// const fetch = require("node-fetch");
import fetch from "node-fetch";

exports.handler = async function (event, context) {
  try {
    // Fetch data from an external API
    const response = await fetch("https://your-api-domain.com/data");
    const data = await response.json();

    // Return the data as a JSON response
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    // Handle errors and return a server error response
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch data" }),
    };
  }
};
