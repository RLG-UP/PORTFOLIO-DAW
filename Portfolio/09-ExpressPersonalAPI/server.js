const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

app.route('/')
    .get((req,res)=>{
        res.render('indx');
    });


var names = [];

app.post('/greet', (req, res)=>{
    var nom = req.body.name;
    console.log(nom);
    res.render('indx', {"nom": nom});
});



app.listen(3000, ()=>{
    console.log("Application listening port 3000");
  });