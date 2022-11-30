const mongoose = require("mongoose");

const CRUDSchema = new mongoose.Schema({
  Name: { type: String },
  Number: { type: String },
  Role: { type: String },
});

module.exports = mongoose.model("CRUD", CRUDSchema);