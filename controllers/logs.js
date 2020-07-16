// @desc    get all logs
// @route   GET /api/v1/logs
// @access  Public
exports.getAllLogs = (req, res, next) => {
  res.status(200).json({ success: true, msg: "list of all logs" });
};

// @desc    get single log
// @route   GET /api/v1/logs/:id
// @access  Public
exports.getLog = (req, res, next) => {
  res.status(200).json({ success: true, msg: `show log ${req.params.id}` });
};

// @desc    create new log
// @route   POST /api/v1/logs/
// @access  Private
exports.createLog = (req, res, next) => {
  res.status(200).json({ success: true, msg: "create new logs" });
};

// @desc    update log
// @route   PUT /api/v1/logs/:id
// @access  Private
exports.updateLog = (req, res, next) => {
  res.status(200).json({ success: true, msg: `update log ${req.params.id}` });
};

// @desc    delete log
// @route   DELETE /api/v1/logs/:id
// @access  Private
exports.deleteLog = (req, res, next) => {
  res.status(200).json({ success: true, msg: `delete log ${req.params.id}` });
};
