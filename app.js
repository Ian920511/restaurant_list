const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const port = 3000;

const exphbs = require("express-handlebars");
const routes = require("./routes");
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

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(routes);

app.listen(port, () => {
  console.log(`Sever is on http://localhost:${port}`);
});
