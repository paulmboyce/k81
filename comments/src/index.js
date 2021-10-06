const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.send("Hello from Comments Service");
});

app.listen(4002);

console.log("Started Comments Service on port 4002...");
