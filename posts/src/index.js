const express = require("express");
const cors = require("cors");
const axios = require("axios");

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
  postEventToBus("http://localhost:4000/event", {
    type: "ADDED_POST",
    payload,
  });
  res.send("Added Post, " + JSON.stringify(payload));
});

const getIdFromSeed = () => {
  idSeed++;
  return idSeed;
};
app.listen(4001);

console.log("Started Posts Service on port 4001...");
