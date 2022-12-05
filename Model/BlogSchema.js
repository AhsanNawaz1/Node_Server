const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  imgName: { type: String },
  imgURL: { type: String },
  topic: { type: String },
  tags: { type: [String] },
  categories: { type: [String] },
  authorID: { type: mongoose.Types.ObjectId },
  author: { type: String },
  createdAt: { type: Date },
});

module.exports = mongoose.model("Posts", PostSchema);
