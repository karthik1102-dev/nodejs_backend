const mongoose = require("mongoose");

const EntitySchema = new mongoose.Schema({
  name: { type: String },
  entity_id:[
    {type: Schema.Types.ObjectId, ref: 'entities'}
  ],
  entity_parent: { type: Number, default:0 }

});

module.exports = mongoose.model("entitytypes", EntitySchema);