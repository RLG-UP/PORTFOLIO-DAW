require('dotenv').config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const csv = require("csv-parser");
const fs = require("fs");

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

let equipe = [
  { code: "mercedes", label: "Mercedes" },
  { code: "aston_martin", label: "Aston Martin" },
  { code: "alpine", label: "Alpine" },
  { code: "hass_f1", label: "Hass F1 Team" },
  { code: "red_bull", label: "Red Bull Racing" },
  { code: "alpha_tauri", label: "Alpha Tauri" },
  { code: "alpha_romeo", label: "Alpha Romeo" },
  { code: "ferrari", label: "Ferrari" },
  { code: "williams", label: "Williams" },
  { code: "mc_laren", label: "McLaren" }
];

var arrDrivers = []
var arrTeams = []
var editDriver = null;

fs.createReadStream("public/data/f1_2023.csv")
  .pipe(csv())
  .on("data", async (row)=>{
    console.log("Receiving information from the .csv file");
    console.log("--> " + JSON.stringify(row));
    const cleanedRow = {};
    for (const key in row) {
        const cleanedKey = key.replace(/^\s+|\s+$/g, '').replace(/[^\x20-\x7E]/g, '');
        cleanedRow[cleanedKey] = row[key];
    }

    console.log("Cleaned row data:", cleanedRow); // Check the cleaned data

    if (cleanedRow.number) {
      const existNum = await Team.findOne({ id: cleanedRow.number });

      if(!existNum){
        console.log("Inserting new Team from the .csv file");
        const team = new Team({
            id: Number(cleanedRow.number),
            name: cleanedRow.current_team,
            nationality: cleanedRow.nationality,
            url: cleanedRow.url,
        });
        await team.save();
        console.log(team);

        console.log("Inserting new Pilot from the .csv file");
        const pilot = new Driver({
            num: Number(cleanedRow.number),
            code: cleanedRow.code,
            forename: cleanedRow.forename,
            surname: cleanedRow.surname,
            dob: new Date(cleanedRow.dob.split("/").reverse().join("-")),
            nationality: cleanedRow.nationality,
            url: cleanedRow.url,
            team: team,
        });

        await pilot.save();
        console.log(pilot);
      }
        
      
    }else{
      console.log("No number received");
    }
    
  })
  .on("end", ()=>{
    console.log("Finished inserting data from the .csv file");
  })

app.get("/", async (req, res) => {
  editDriver = null
  arrDrivers = await Driver.find({});
  arrTeams = await Team.find({});

  var params = {
    arrDrivers,
    arrTeams,
    countries,
    equipe
  };
  res.render("index", params);
});

app.route("/add")
  .post(async (req, res)=>{
    const team = new Team({
      id: req.body.id,
      name: req.body.team,
      nationality: req.body.nation,
      url: req.body.url
    });
    await team.save();
    console.log(team);

    const pilot = new Driver({
      num: req.body.num,
      code: req.body.code,
      forename: req.body.name,
      surname: req.body.lname,
      dob: req.body.dob,
      nationality: req.body.nation,
      url: req.body.url,
      team: team,
    });

    await pilot.save();
    console.log(pilot);
    res.redirect("/");
  });

app.route("/edit")
  .get(async (req, res)=>{
    editDriver = await Driver.findOne({ _id: req.query.dr});
    if(editDriver){
      console.log(editDriver);
      var params = {
        editDriver,
        arrDrivers,
        arrTeams,
        countries,
        equipe
      }
      res.render("edit.ejs", params);
    }else{
    res.redirect("/");
    }
  })

app.listen(3000, (err) => {
  console.log("Listening on port 3000");
});
