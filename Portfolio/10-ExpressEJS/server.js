const express = require("express");
const app = express();
const path = require('path');
const https = require("https");
const FormData = require("form-data");


// TODO: configure the express server

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

const longContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";

let posts = [];
let name;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/html/index.html"));
});

app.get("/login", (req, res) => {
  const userName = req.query.name;
  if (userName) {
    res.send(`Hello, ${userName}! (get)`);
  } else {
    res.send("ERROR : name required");
  }
});

app.post("/login", (req, res) => {
  const userName = req.body.name; 
  if (userName) {
    res.send(`Hello, ${userName}! (post)`);
  } else {
    res.send("ERROR : name required");
  }
});

app.listen(3000, (err) => {
  console.log("Listening on port 3000");
});
