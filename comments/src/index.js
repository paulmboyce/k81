const express = require("express");
const cors = require("cors");

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

app.post("/comment", function (req, res) {
  let payload = JSON.parse(req.body.data);
  console.log("GOT ", payload);
  payload.id = getIdFromSeed();
  payload.postId = 1001;
  comments.push(payload);
  res.send("Added comment to Post, " + JSON.stringify(payload));
});

const getIdFromSeed = () => {
  idSeed++;
  return idSeed;
};

app.listen(4002);

console.log("Started Comments Service on port 4002...");
