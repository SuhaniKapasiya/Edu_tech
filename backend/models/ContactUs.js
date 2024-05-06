const mongoose = require("mongoose");

const contactUsSchema = new mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    contactNumber: { type: Number },
    message: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ContactUs", contactUsSchema);
