require("dotenv").config();

var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

require("./models/connection");

var usersRouter = require("./routes/users");
var recipesRouter = require("./routes/recipes");
var tastedFoodsRouter = require("./routes/tastedFoods");
var articlesRouter = require("./routes/articles");

var app = express();

const cors = require("cors");
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", usersRouter);
app.use("/recipes", recipesRouter);
app.use("/tastedFoods", tastedFoodsRouter);
app.use("/articles", articlesRouter);

module.exports = app;
