const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

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

  if (!keyword.trim()) {
    return res.redirect("/");
  }

  const restaurants = restaurantList.results.filter((restaurant) => {
    return (
      restaurant.name.includes(keyword) ||
      restaurant.category.includes(keyword) ||
      restaurant.name_en.toLowerCase().trim().includes(keyword)
    );
  });

  //如果沒有搜尋結果
  if (restaurants.length === 0) {
    return res.render("wrong");
  }

  res.render("index", { restaurants, keyword });
});

app.get("/restaurants/:id/edit", (req, res) => {
  const id = req.params.id;

  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render("edit", { restaurant }))
    .catch((error) => console.log(error));
});

app.post("/restaurants/:id/edit", (req, res) => {
  const id = req.params.id

  return Restaurant.findById(id)
    .update(req.body)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch((error) => console.log(error))
})

app.listen(port, () => {
  console.log(`Sever is on http://localhost:${port}`);
});
