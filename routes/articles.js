var express = require("express");
var router = express.Router();
const Article = require("../models/articles");
const User = require("../models/users");

// Route to get all articles needed
router.get("/", (req, res) => {
  Article.find().then((articles) => {
    if (articles) {
      res.json({
        result: true,
        articlesList: articles,
      });
    } else {
      res.json({
        result: false,
        error: "Articles not found",
      });
    }
  });
});

// Route to get only a specific article through the slud in url
router.get("/:slug", (req, res) => {
  Article.findOne({ slug: req.params.slug }).then((article) => {
    if (article) {
      res.json({
        result: true,
        article: article,
      });
    } else {
      res.json({
        result: false,
        error: "Article not found",
      });
    }
  });
});

module.exports = router;
