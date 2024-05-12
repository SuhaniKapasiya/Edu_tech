const mongoose = require("mongoose");
// const SubSection = require("./SubSection");

const SectionSchema = new mongoose.Schema({
  sectionName: {
    type: String,
  },
  subSection: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "subSection",
    },
  ],
});

module.exports = mongoose.model("Section", SectionSchema);
