const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/", function (req, res) {
  res.send("Hello from Posts Service");
});

app.listen(4001);

console.log("Started Posts Service on port 4001...");
