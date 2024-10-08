const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

var names = [];
var tasks = [];

app.route('/')
    .get((req,res)=>{
        res.render('indx', {names, tasks});
    });




app.post('/greet', (req, res)=>{
    var nom = req.body.name;
    console.log(nom);
    names.push(nom);

    res.render('indx', { "names": names , tasks});
});

app.get('/sup', (req,res)=>{
    var vals = req.query.vals;
    res.render('wzzp', {"vals": vals});
    console.log(vals);
    
});

app.post('/task', (req, res)=>{
    var tsk = req.body.tsk;
    tasks.push(tsk);
    res.render('indx', {"tasks": tasks, names});
});

app.listen(3000, ()=>{
    console.log("Application listening port 3000");
  });