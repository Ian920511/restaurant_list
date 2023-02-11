const express = require("express");
const passport = require("passport");
const router = express.Router();

const User = require("../../models/user");

router.get("/login", (req, res) => {
  res.render("login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login",
  })
);

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  const errors = [];

  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: "所有欄位皆是必填!" });
  }

  if (password !== confirmPassword) {
    errors.push({ message: "密碼與確認密碼不相符!" });
  }

  if (errors.length) {
    return res.render("register", {
      errors,
      name,
      email,
      password,
      confirmPassword,
    });
  }

  User.findOne({ email }).then((user) => {
    if (user) {
      errors.push({ message: "此 Email已經註冊過了!" });
      return res.render("register", {
        errors,
        name,
        email,
        password,
        confirmPassword,
      });
    }
    return User.create({
      name,
      email,
      password,
    })
      .then(() => req.flash("success_msg", "成功建立帳號請登入!"))
      .then(() => res.redirect("/users/login"))
      .catch((error) => console.log(error));
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "成功登出!");
  res.redirect("/users/login");
});

module.exports = router;
