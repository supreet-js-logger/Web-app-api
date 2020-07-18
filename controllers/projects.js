const Project = require("../models/Project");
const User = require("../models/User");
const { v4: uuidv4 } = require("uuid");
const asycnHandler = require("../middleware/async");

// @desc    get all projects
// @route   GET /api/v1/projects
// @access  Private
exports.getAllProjects = asycnHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  const organization = user.organization;
  let projects = await Project.find({ organization, isActive: true });
  res.status(200).json({ success: true, data: projects });
});

// @desc    get single project
// @route   GET /api/v1/project/:id
// @access  Private
exports.getProject = (req, res) => {
  res.status(200).json({ success: true, msg: `show project ${req.params.id}` });
};

// @desc    create new project
// @route   POST /api/v1/projects/
// @access  Private
exports.createProject = asycnHandler(async (req, res) => {
  const { name, type } = req.body;
  const apiKey = uuidv4();
  const user = await User.findById(req.user.id);
  const organization = user.organization;
  let project = await Project.create({ name, type, apiKey, organization });
  project.apiKey = apiKey;
  res.status(200).json({ success: true, data: project });
});

// @desc    update project
// @route   PUT /api/v1/projects/:id
// @access  Private
exports.updateProject = (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `update project ${req.params.id}` });
};

// @desc    delete project
// @route   DELETE /api/v1/projects/:id
// @access  Private
exports.deleteProject = (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `delete project ${req.params.id}` });
};
