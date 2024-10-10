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
    var params = {
        name,
        posts
    };
    res.render("test", params);
});

app.get("/hi", (req, res)=>{
    var params = {
      name,
      posts
    };
    res.render("test-hi", params);
});

app.get("/login", (req, res) => {
    if(req.query.name){
        name = req.query.name + " (GET)";
        res.redirect("/hi");
    }
    else{
        res.redirect('/');
    }
 
});

app.post("/login", (req, res) => {
    if(req.body.name){
        name = req.body.name + " (POST)";
        res.redirect("/hi");
    }
    else{
        res.redirect('/');
    }
    
});

app.post("/new", (req, res)=>{
    var title = req.body.title;
    var content = req.body.content;

    if(title && content){
        var summary = "";
        if(content.length > 100){
            summary = content.slice(0,101) + " (...)";
        }
        else{
            summary = content;
        }
        var newPost = [title, content, summary]
        posts.push(newPost);
    }

    res.redirect("/hi");
});

app.get("/read", (req, res)=>{
    var title = req.query.title;
    var content = req.query.content;
    var i = req.query.i;
    
    if(title && content){
        console.log(title);
        var params ={
            name,
            title,
            content,
            i
        };
        res.render("post", params);
    }
});

app.get("/edit", (req, res)=>{
    var i = req.query.i;
    var title = posts[i][0];
    var content = posts[i][1];

    var params = {
        name,
        i,
        title,
        content
    };

    res.render("post-edit.ejs", params);

});

app.get("/delete", (req, res)=>{
    var i = req.query.i;
    delete posts[i]
    res.redirect("/hi");
});

app.post("/savePost", (req, res)=>{
    var newTitle = req.body.newTitle;
    var newContent = req.body.newContent;
    var summary = "";
    var i = req.query.i;

    if(newContent.length > 100){
        summary = newContent.slice(0,101) + " (...)";
    }
    else{
        summary = newContent;
    }

    posts[i][0] = newTitle;
    posts[i][1] = newContent;
    posts[i][2] = summary;

    res.redirect("/hi");
});

app.listen(3000, (err) => {
  console.log("Listening on port 3000");
});
