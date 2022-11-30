const mongoose = require("mongoose");

const Portfolio = new mongoose.Schema({
  email: { type: String },
  subject: { type: String },
  description: { type: String },
});

module.exports = mongoose.model("Portfolio", Portfolio);