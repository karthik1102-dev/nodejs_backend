const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const userAssociateSchema = new mongoose.Schema({
  user_id:[
    {type: Schema.Types.ObjectId, ref: 'users'}
  ],
  local_id: { type: Number },
  vlcc_id: { type: Number }
});

module.exports = mongoose.model("user_associate", userAssociateSchema);