const express = require("express");
const router = express.Router();

const Restaurant = require("../../models/restaurant");

router.get("/", (req, res) => {
  const userId = req.user._id;
  Restaurant.find({ userId })
    .lean()
    .sort({ _id: 1 })
    .then((restaurants) => res.render("index", { restaurants }))
    .catch((error) => console.log(error));
});

router.get("/search", (req, res) => {
  const { keyword, sort } = req.query;
  const regex = new RegExp(keyword, "i");
  const sortOrder = {
    default: { _id: 1 },
    fromNew: { _id: -1 },
    fromA: { name_en: 1 },
    fromZ: { name_en: -1 },
    fromCategory: { category: 1 },
    fromLocation: { location: 1 },
  };

  Restaurant.find({ $or: [{ name: regex }, { category: regex }] })
    .lean()
    .sort(sortOrder[sort])
    .then((restaurantsData) => {
      if (restaurantsData.length === 0) {
        res.render("wrong");
      } else {
        res.render("index", { restaurants: restaurantsData, keyword, sort });
      }
    })
    .catch((error) => console.log(error));
});

module.exports = router;
