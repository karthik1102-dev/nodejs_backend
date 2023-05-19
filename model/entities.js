const mongoose = require("mongoose");

const userEntitySchema = new mongoose.Schema({
  name: { type: String },
  type: { type: String, default: null },
  map: { type: String, default: null },
  pincode: { type: Number, default: null }

});

module.exports = mongoose.model("entities", userEntitySchema);