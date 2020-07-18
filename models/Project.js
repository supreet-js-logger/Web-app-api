const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { Schema } = mongoose;

// create schema for project
const ProjectSchema = new Schema({
  name: {
    type: String,
    minlength: 6,
    required: [true, "Please add a name"],
  },
  type: {
    type: String,
    enum: ["JavaScript", "Node"],
    default: "JavaScript",
  },
  apiKey: {
    type: String,
    required: [true, "Please add a apiKey"],
    select: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
    required: true,
  },
});

//Encrypt api key before saving
ProjectSchema.pre("save", async function hashPassword() {
  const salt = await bcrypt.genSalt(10);
  this.apiKey = await bcrypt.hash(this.apiKey, salt);
});

// match project entered password to hashed password in database
ProjectSchema.methods.matchAPIKey = function matchAPIKey(enteredApiKey) {
  return bcrypt.compare(enteredApiKey, this.apiKey);
};

// create model for project
const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;
