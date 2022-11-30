const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  img: { type: String },
  topic: { type: String },
  tags: { type: [String] },
  categories: { type: [String] },
  author: { type: mongoose.Types.ObjectId }
});

module.exports = mongoose.model("Posts", PostSchema);