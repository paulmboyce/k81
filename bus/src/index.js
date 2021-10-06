const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // for parsing application/json

app.get("/bus", function (req, res) {
  res.send("Hello from Event Bus Service");
});

app.listen(4000);

console.log("Started Event Bus Service on port 4000...");
