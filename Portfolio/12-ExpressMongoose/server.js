require('dotenv').config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

const user = process.env.DB_USER;
const pass = process.env.DB_PASS;
const db = process.env.DB;


const mongoUrl = "mongodb://127.0.0.1:27017/f1";

const uri = `mongodb+srv://${user}:${pass}@cluster0.m6rt5.mongodb.net/${db}?retryWrites=true&w=majority&appName=Cluster0`;


mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Definition of a schema
const teamSchema = new mongoose.Schema({
  id: Number,
  name: String,
  nationality: String,
  url: String,
});
teamSchema.set("strictQuery", true);

const driverSchema = new mongoose.Schema({
  num: Number,
  code: String,
  forename: String,
  surname: String,
  dob: Date,
  nationality: String,
  url: String,
  team: teamSchema,
});
driverSchema.set("strictQuery", true);

const Team = mongoose.model("Team", teamSchema);
const Driver = mongoose.model("Driver", driverSchema);

let countries = [
  { code: "ENG", label: "England" },
  { code: "SPA", label: "Spain" },
  { code: "GER", label: "Germany" },
  { code: "FRA", label: "France" },
  { code: "MEX", label: "Mexico" },
  { code: "AUS", label: "Australia" },
  { code: "FIN", label: "Finland" },
  { code: "NET", label: "Netherlands" },
  { code: "CAN", label: "Canada" },
  { code: "MON", label: "Monaco" },
  { code: "THA", label: "Thailand" },
  { code: "JAP", label: "Japan" },
  { code: "CHI", label: "China" },
  { code: "USA", label: "USA" },
  { code: "DEN", label: "Denmark" },
];



app.get("/", (req, res) => {
  res.render("index");
});

app.route("/add")
  .post(async (req, res)=>{
    const team = new Team({
      id: req.body.id,
      name: req.body.name,
      nationality: req.body.nationality,
      url: req.body.url
    });
    await team.save();
    console.log(team);

    const pilot = new Driver({
      num: req.body.num,
      code: req.body.code,
      forename: req.body.forename,
      surname: req.body.surname,
      dob: req.body.dob,
      nationality: req.body.nationality,
      url: req.body.url,
      team: team
    });

    await pilot.save();
    console.log(pilot);
    res.redirect("/");
  })

app.listen(3000, (err) => {
  console.log("Listening on port 3000");
});
