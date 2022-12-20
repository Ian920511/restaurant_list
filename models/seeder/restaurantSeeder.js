const mongoose = require("mongoose");
const Restaurant = require("../restaurant");
const restaurantData = require("../../restaurant.json").results;
const db = require("../../config/mongoose");

db.once("open", () => {
  Restaurant.create(restaurantData);

  console.log("its done!");
});
