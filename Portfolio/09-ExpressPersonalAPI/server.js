const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

var names = [];

app.route('/')
    .get((req,res)=>{
        res.render('indx', {names});
    });




app.post('/greet', (req, res)=>{
    var nom = req.body.name;
    console.log(nom);
    names.push(nom);

    res.render('indx', { "names": names });
});

app.get('/sup', (req,res)=>{
    var vals = req.body.vals;
    res.render('wzzp', {"vals": vals})
});

app.listen(3000, ()=>{
    console.log("Application listening port 3000");
  });