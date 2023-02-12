const bcrypt = require("bcryptjs");

const Restaurant = require("../restaurant");
const User = require("../user");
const restaurantData = require("./restaurant.json").results;
const seed_user = require("./user.json").results;
const db = require("../../config/mongoose");

db.once("open", () => {
  return Promise.all(
    seed_user.map((user) => {
      const { name, email, password, restaurantIndex } = user;

      return bcrypt
        .genSalt(10)
        .then((salt) => bcrypt.hash(password, salt))
        .then((hash) =>
          User.create({
            name,
            email,
            password: hash,
          })
        )

        .then((user) => {
          const filteredRestaurants = restaurantData.filter((index) =>
            restaurantIndex.includes(index.id)
          );
          const userId = user._id;

          return Promise.all(
            Array.from({ length: filteredRestaurants.length }, (_, i) =>
              Restaurant.create({ ...filteredRestaurants[i], userId })
            )
          );
        })

        .then(() => {
          console.log("done!");
          process.exit();
        })
        .catch((error) => console.log(error));
    })
  );
});
