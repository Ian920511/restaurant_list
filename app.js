const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const port = 3000;

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const Restaurant = require("./models/restaurant");
const exphbs = require("express-handlebars");

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", () => {
  console.log(error);
});

db.once("open", () => {
  console.log("mongodb connected");
});

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  Restaurant.find()
    .lean()
    .then((restaurants) => res.render("index", { restaurants }))
    .catch((error) => console.log(error));
});

app.get("/restaurants/new", (req, res) => {
  return res.render("new");
});

app.post("/restaurants", (req, res) => {
  return Restaurant.create(req.body)
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});

app.get("/restaurants/:id", (req, res) => {
  const id = req.params.id;

  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render("show", { restaurant }))
    .catch((error) => console.log(error));
});

app.get("/search", (req, res) => {
  const keyword = req.query.keyword.trim();
  const regex = new RegExp(keyword, "i");

  if (!keyword.trim()) {
    return res.redirect("/");
  }

  Restaurant.find({ $or: [{ name: regex }, { category: regex }] })
    .lean()
    .then((restaurantsData) => {
      if (restaurantsData.length === 0) {
        res.render("wrong");
      } else {
        res.render("index", { restaurants: restaurantsData, keyword });
      }
    })
    .catch((error) => console.log(error));
});

app.get("/restaurants/:id/edit", (req, res) => {
  const id = req.params.id;

  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render("edit", { restaurant }))
    .catch((error) => console.log(error));
});

app.put("/restaurants/:id", (req, res) => {
  const id = req.params.id;

  return Restaurant.findById(id)
    .update(req.body)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch((error) => console.log(error));
});

app.delete("/restaurants/:id", (req, res) => {
  const id = req.params.id;
  return Restaurant.findById(id)
    .then((restaurant) => restaurant.remove())
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});

app.listen(port, () => {
  console.log(`Sever is on http://localhost:${port}`);
});
