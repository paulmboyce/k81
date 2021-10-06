const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/", function (req, res) {
  res.send("Hello from Comments Service");
});

app.listen(4002);

console.log("Started Comments Service on port 4002...");
