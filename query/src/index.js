const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // for parsing application/json

const postComments = {}; // post.id, comments:[id/text,id/text]

app.get("/ping", function (req, res) {
  res.send("Hello from Post Comments Service");
});

app.get("/articlecomments", function (req, res) {
  res.send(postComments);
});

app.post("/event", function (req, res) {
  const event = JSON.parse(req.body.event);
  console.log("GOT EVENT: ", event);
  console.log("GOT EVENT TYPE: ", event.type);

  if (event.type === "ADDED_POST") {
    console.log("GOT ", event);
    console.log("GOT PAYLOAD", event.payload);
    postComments[event.payload.id] = {
      title: event.payload.title,
      postId: event.payload.id,
      comments: [],
    }; // empty array awaitig comments
  }
  if (event.type === "ADDED_COMMENT") {
    console.log("GOT ", event);
    if (
      postComments[event.payload.postId] &&
      postComments[event.payload.postId].comments
    ) {
      postComments[event.payload.postId].comments.push(event.payload);
    } else {
      console.log(
        "Problem with ",
        event.payload.postId,
        postComments[event.payload.postId]
      );
    }
  }
  console.log("POST COMMENTS:  ", postComments);
});

app.listen(4003);

console.log("Started Posts-AND-Comments Service on port 4003...");
