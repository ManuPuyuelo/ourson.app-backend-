var express = require("express");
var router = express.Router();
const Article = require("../models/articles");
const User = require("../models/users");

// Route to get all articles needed
router.get("/", (req, res) => {
  // Récupération des query parameters 'start' et 'limit'
  const start = Number(req.query.start) || 0;
  const limit = Number(req.query.limit);

  Article.find()
    .sort({ createdDate: -1 })
    .skip(start)
    .limit(limit)
    .then((articles) => {
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

// Route to get all articles needed per each section
router.get("/section/:sectionName", (req, res) => {
  const sectionName = req.params.sectionName;

  if (sectionName === "toutes-les-sections") {
    Article.find()
      .sort({ createdDate: -1 })
      .then((articles) => {
        if (articles.length > 0) {
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
      })
      .catch((error) => {
        res.json({
          result: false,
          error: error.message,
        });
      });
  } else {
    Article.find({ tags: sectionName })
      .sort({ createdDate: -1 })
      .then((articles) => {
        if (articles.length > 0) {
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
      })
      .catch((error) => {
        res.json({
          result: false,
          error: error.message,
        });
      });
  }
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
