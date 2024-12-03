require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

KEY = process.env.KEY;

app.use(
  session({
    secret: KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

USER = process.env.DB_USER;
PASS = process.env.DB_PASS;
DB = process.env.DB;
const mongoUrl = `mongodb+srv://${USER}:${PASS}@cluster0.m6rt5.mongodb.net/?retryWrites=true&w=majority&appName=${DB}`;
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

// Definition of a schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
});
userSchema.set("strictQuery", true);
userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);
module.exports = User;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/html/index.html");
});

app.route('/login')
  .get((req, res)=>{
    res.sendFile(__dirname + "/public/html/secret.html");
  })
  .post(async (req, res)=>{
    username = req.body.user;
    password = req.body.pass;
    email = req.body.email;

    const usr = await appUser.findOne({
      $or: [
          { username: username },
        ]
    });
    
    if (!usr) {
        const user = new appUser({username, password, email});
        await user.save();
    }
  })

app.listen(3000, (err) => {
  console.log("Listening on port 3000");
});
