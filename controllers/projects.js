// @desc    get all projects
// @route   GET /api/v1/projects
// @access  Private
exports.getAllProjects = (req, res) => {
  res.status(200).json({ success: true, msg: "list of all projects" });
};

// @desc    get single project
// @route   GET /api/v1/project/:id
// @access  Private
exports.getProject = (req, res) => {
  res.status(200).json({ success: true, msg: `show project ${req.params.id}` });
};

// @desc    create new project
// @route   POST /api/v1/projects/
// @access  Private
exports.createProject = (req, res) => {
  res.status(200).json({ success: true, msg: "create a new project" });
};

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
