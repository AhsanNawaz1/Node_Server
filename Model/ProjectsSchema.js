const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  title: { type: String },
  demi_Title: { type: String },
  description: { type: String },
  stacks: { type: [String] },
  live: { type: String },
  pointers: { type: [String] },
});

module.exports = mongoose.model("Projects", ProjectSchema);