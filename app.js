const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");

const port = 3000;

const exphbs = require("express-handlebars");
const routes = require("./routes");

const usePassport = require("./config/passport");
require("./config/mongoose");

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    helpers: {
      compare: function (arg1, arg2, options) {
        if (arg1 === arg2) {
          return options.fn(this);
        }
      },
    },
  })
);
app.set("view engine", "handlebars");

app.use(
  session({
    secret: "MySecret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

usePassport(app);

app.use(flash());
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.user = req.user;
  res.locals.success_msg = req.flash("success_msg");
  res.locals.warning_msg = req.flash("warning_msg");
  next();
});

app.use(routes);

app.listen(port, () => {
  console.log(`Sever is on http://localhost:${port}`);
});
