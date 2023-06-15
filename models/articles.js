const mongoose = require("mongoose");

const { Schema } = mongoose;

const bodySectionSchema = new Schema({
  type: String,
  content: String,
});

const contentSchema = new Schema({
  title: String,
  subtitle: String,
  summary: String,
  longSummary: String,
  body: [bodySectionSchema], // Utilise le schéma bodySectionSchema pour le sous-document
});

const articleSchema = new Schema({
  imageURL: String,
  author: String,
  createdDate: Date,
  content: contentSchema, // Utilise le schéma contentSchema pour le sous-document
  slug: String,
  tags: [String],
  status: String,
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
