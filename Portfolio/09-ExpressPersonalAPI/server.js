const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

app.route('/')
    .get((req,res)=>{
        res.render("index.html");
    });

app.route('/greet')
    .get((req, res)=>{
        res.send(app.req);
    });



app.listen(3000, ()=>{
    console.log("Application listening port 3000");
  });