const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const digestSchema = new mongoose.Schema({
  lr: { type: String, default: null },
  apl: { type: String, default: null },
  fat: { type: String, default: null },
  snf: { type: String, default: null },
  water: { type: String, default: null },

  litre: { type: String, default: null },
  shift: { type: String, default: null },
  temperature: { type: String, default: null },
  submitter_id: { type: String, default: null },
  rate_type: { type: String, default: null },

  milk_type: { type: String, default: null },
  submitted_on: { type: String, default: null },

  operator_id: { type: String, default: null },
  bmc_id: { type: String, default: null },
  vlcc_id: { type: String, default: null },
  union_id: { type: String, default: null },
  company_id: { type: String, default: null }
});

module.exports = mongoose.model("digests", digestSchema);