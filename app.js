const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const port = 3000;

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const exphbs = require("express-handlebars");
const routes = require("./routes");

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
app.use(routes);

app.listen(port, () => {
  console.log(`Sever is on http://localhost:${port}`);
});
