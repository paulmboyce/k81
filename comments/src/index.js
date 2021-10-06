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

let comments = [];
var idSeed = 39001;

app.get("/ping", function (req, res) {
  res.send("Hello from Comments Service");
});

app.get("/comments", function (req, res) {
  res.send(comments);
});

app.post("/post/:id/comment", function (req, res) {
  let payload = JSON.parse(req.body.data);
  console.log("GOT ", payload);
  payload.id = getIdFromSeed();
  payload.postId = req.params["id"];
  comments.push(payload);
  postEventToBus("http://localhost:4000/event", {
    type: "ADDED_COMMENT",
    payload,
  });

  res.send("Added comment to Post, " + JSON.stringify(payload));
});

const getIdFromSeed = () => {
  idSeed++;
  return idSeed;
};

app.listen(4002);

console.log("Started Comments Service on port 4002...");
