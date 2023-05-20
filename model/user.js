const mongoose = require("mongoose");
const role = require("./role");
var Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  role_id:[
    {type: Schema.Types.ObjectId, ref: 'roles'}
  ],
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
  company_id: { type: String, default: true },
  union_id: { type: String, default: null },
  bmc_id: { type: String, default: null },
  vlcc_id: { type: String, default: null },
  rfid: { type: String, default: null },
});

module.exports = mongoose.model("users", userSchema);