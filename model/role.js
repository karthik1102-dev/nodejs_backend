const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  role: { type: Number },
  status: { type: Number },
});

module.exports = mongoose.model("roles", roleSchema);