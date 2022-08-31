const mongoose = require("mongoose");

const certSchema = new mongoose.Schema(
  {
    url: String,
    completion: Date,
    course: String,
    by: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("certs", certSchema);
