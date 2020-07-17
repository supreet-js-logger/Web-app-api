const mongoose = require("mongoose");
const urlUtil = require("../utils/urlUtil");

const { Schema } = mongoose;
const { slugify } = urlUtil;

// create schema for log
const OrganizationSchema = new Schema({
  name: {
    type: String,
    minlength: 6,
    required: [true, "Please add a name"],
    unique: true,
  },
  slug: {
    type: String,
    index: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Encrypt password before saving
OrganizationSchema.pre("save", function slugifyOrgName() {
  this.slug = slugify(this.name);
});

// create model for organization
const Organization = mongoose.model("Organization", OrganizationSchema);

module.exports = Organization;
