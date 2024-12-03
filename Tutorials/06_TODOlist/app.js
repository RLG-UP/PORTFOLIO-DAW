const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();
const secret = process.env.SECRET;

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let error = "";

mongoose.connect("here_the_mongo_url", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const taskSchema = new mongoose.Schema({ item: { type: String, required: true } });
const Task = mongoose.model("Task", taskSchema);

const workTaskSchema = new mongoose.Schema({ item: { type: String, required: true } });
const WorkTask = mongoose.model("WorkTask", workTaskSchema);

app.get("/", (req, res) => {
  const day = date.getDate();

  Task.find({})
    .then((tasks) => {
      res.render("list", { listTitle: day, newListItems: tasks, error });
    })
    .catch(() => {
      res.render("list", { listTitle: day, newListItems: [], error: "Error loading tasks." });
    });
});

app.post("/", (req, res) => {
  const item = req.body.newItem;

  if (req.body.list === "Work") {
    const task = new WorkTask({ item });

    task
      .save()
      .then(() => res.redirect("/work"))
      .catch(() => res.redirect("/work"));
  } else {
    const task = new Task({ item });

    task
      .save()
      .then(() => res.redirect("/"))
      .catch(() => res.redirect("/"));
  }
});

app.get("/work", (req, res) => {
  WorkTask.find({})
    .then((tasks) => {
      res.render("list", { listTitle: "Work List", newListItems: tasks, error });
    })
    .catch(() => {
      res.render("list", { listTitle: "Work List", newListItems: [], error: "Error loading tasks." });
    });
});

app.post("/work/delete", (req, res) => {
  const id = req.body.id;

  WorkTask.findByIdAndDelete(id)
    .then(() => res.redirect("/work"))
    .catch(() => res.redirect("/work"));
});

app.post("/delete", (req, res) => {
  const id = req.body.id;

  Task.findByIdAndDelete(id)
    .then(() => res.redirect("/"))
    .catch(() => res.redirect("/"));
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
