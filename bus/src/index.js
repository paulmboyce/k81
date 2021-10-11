const express = require("express");
const cors = require("cors");
const axios = require("axios");

const {
  CLUSTER_POSTS_URI,
  CLUSTER_POSTS_PORT,
  CLUSTER_COMMENTS_URI,
  CLUSTER_COMMENTS_PORT,
  CLUSTER_QUERY_URI,
  CLUSTER_QUERY_PORT,
  LISTEN_PORT,
} = require("./Constants");

const postEventToService = async (path, payload = {}) => {
  try {
    const response = await axios.post(path, {
      event: JSON.stringify(payload),
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error.message);
  }
};

const app = express();
app.use(cors());
app.use(express.json()); // for parsing application/json

app.get("/bus", function (req, res) {
  res.send("Hello from Event Bus Service");
});

app.post("/event", function (req, res) {
  const event = JSON.parse(req.body.event);
  console.log("GOT EVENT:  (pass it on!)", event);
  postEventToService(`${CLUSTER_POSTS_URI}:${CLUSTER_POSTS_PORT}/event`, event);
  postEventToService(
    `${CLUSTER_COMMENTS_URI}:${CLUSTER_COMMENTS_PORT}/event`,
    event
  );
  postEventToService(`${CLUSTER_QUERY_URI}:${CLUSTER_QUERY_PORT}/event`, event);
});

app.listen(LISTEN_PORT);

console.log(`Started Event Bus Service on port ${LISTEN_PORT}...`);
