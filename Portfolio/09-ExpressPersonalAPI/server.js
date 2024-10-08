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





app.get('/greet', (req, res, next) => {
    const nom = req.query.name;
    console.log(nom);
    
    if (!nom) {
        const error = new Error('Name not provided');
        error.status = 400; 
        return next(error);
    }
    
    names.push(nom);
    res.redirect("/");
});

app.use((err, req, res, next) => {
    if (err.status === 400) {
        res.render('indx', { names, tasks, errorMessage: err.message });
    } else {
        res.status(500).send('Internal Server Error');
    }
});

app.put('/greet/:name', (req, res) => {
    const nom = req.params.name;
    names.push(nom);
    console.log(names);
    res.json({names});
});

app.get('/sup', (req,res)=>{
    var vals = req.query.vals;
    res.render('wzzp', {"vals": vals});
    console.log(vals);
    
});

app.post('/task', (req, res)=>{
    var tsk = req.body.tsk;
    console.log(tsk);
    tasks.push(tsk);
    res.redirect("/");
});

app.get('/task', (req, res) => {
    res.json(tasks); 
});

app.get('/delete', (req, res)=>{
    var delIdx = req.query.idx;
    delete tasks[delIdx];
    res.redirect("/");
  });

  app.get('/up', (req, res)=>{
    var upIdx = parseInt(req.query.idx);
    if(upIdx > 0){
        copy = tasks[upIdx-1];
        tasks[upIdx-1] = tasks[upIdx];
        tasks[upIdx] = copy;
    }

    res.redirect("/");
  });

  app.get('/down', (req, res)=>{
    var upIdx = parseInt(req.query.idx);
    if(upIdx < tasks.length-1){
        copy = tasks[upIdx+1];
        tasks[upIdx+1] = tasks[upIdx];
        tasks[upIdx] = copy;
    }
    
    res.redirect("/");
  });

app.listen(3000, ()=>{
    console.log("Application listening port 3000");
  });