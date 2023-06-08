const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const transactionSchema = new mongoose.Schema({
  paid: { type: String, default: false },
  digest_id: { type: String, default: null },
  bmc_id: { type: String, default: null },
  vlcc_id: { type: String, default: null },
  union_id: { type: String, default: null },
  company_id: { type: String, default: null },
  submitter_id: { type: String, default: null },
});

module.exports = mongoose.model("transactions", transactionSchema);