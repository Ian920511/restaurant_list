const express = require("express");
const router = express.Router();

const Restaurant = require("../../models/restaurant");

router.get("/", (req, res) => {
  Restaurant.find()
    .lean()
    .then((restaurants) => res.render("index", { restaurants }))
    .catch((error) => console.log(error));
});

router.get("/search", (req, res) => {
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

module.exports = router;
