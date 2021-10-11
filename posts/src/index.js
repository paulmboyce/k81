const express = require("express");
const cors = require("cors");
const axios = require("axios");
const {
  CLUSTER_IP_URI_BUS,
  CLUSTER_BUS_PORT,
  LISTEN_PORT,
} = require("./Constants");

const postEventToBus = async (path, payload = {}) => {
  try {
    const response = await axios.post(path, {
      event: JSON.stringify(payload),
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const app = express();
app.use(cors());
app.use(express.json()); // for parsing application/json

const posts = [];
var idSeed = 1001;

app.get("/ping", function (req, res) {
  res.send("Hello from Posts Service");
});

app.get("/articles", function (req, res) {
  res.send(posts);
});

app.post("/article", function (req, res) {
  let payload = JSON.parse(req.body.data);
  console.log("GOT ", payload);
  payload.id = getIdFromSeed();
  posts.push(payload);
  postEventToBus(`http://${CLUSTER_IP_URI_BUS}:${CLUSTER_BUS_PORT}/event`, {
    type: "ADDED_POST",
    payload,
  });
  res.send("Added Post, " + JSON.stringify(payload));
});

app.post("/event", function (req, res) {
  const event = JSON.parse(req.body.event);
  console.log("GOT EVENT: ", event);
  console.log("GOT EVENT TYPE: ", event.type);
});

const getIdFromSeed = () => {
  idSeed++;
  return idSeed;
};
app.listen(LISTEN_PORT);

console.log(`Started Posts Service on port ${LISTEN_PORT}...`);
