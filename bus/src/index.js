const express = require("express");
const cors = require("cors");
const axios = require("axios");
const postEventToServices = async (path, payload = {}) => {
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
  //  postEventToServices("http://localhost:4001/event", event);
  //  postEventToServices("http://localhost:4002/event", event);
  postEventToServices("http://localhost:4003/event", event);
});

app.listen(4000);

console.log("Started Event Bus Service on port 4000...");
