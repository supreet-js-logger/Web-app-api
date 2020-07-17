const mongoose = require("mongoose");

const { Schema } = mongoose;

// create schema for log
const LogSchema = new Schema({
  data: {
    type: String,
    required: [true, "The log data field is required"],
  },
});

// create model for log
const Log = mongoose.model("logs", LogSchema);

module.exports = Log;
