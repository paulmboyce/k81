const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.send("Hello from Posts Service");
});

app.listen(4001);

console.log("Started Posts Service on port 4001...");
