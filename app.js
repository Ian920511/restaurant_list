const express = require("express");
const app = express();
const mongoose = require("mongoose");

const port = 3000;

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const restaurantList = require("./restaurant.json");
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

app.get("/", (req, res) => {
  const restaurants = restaurantList.results;
  res.render("index", { restaurants });
});

app.get("/restaurant/:id", (req, res) => {
  const restaurant = restaurantList.results.find(
    (restaurant) => restaurant.id.toString() === req.params.id
  );
  res.render("show", { restaurant });
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

app.listen(port, () => {
  console.log(`Sever is on http://localhost:${port}`);
});
