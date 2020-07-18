const express = require("express");
const { protect } = require("../middleware/auth");
const {
  getAllProjects,
  createProject,
  getProject,
  updateProject,
  deleteProject,
} = require("../controllers/projects");

const router = express.Router();

router.route("/").get(protect, getAllProjects).post(protect, createProject);

router
  .route("/:id")
  .get(protect, getProject)
  .put(protect, updateProject)
  .delete(protect, deleteProject);

module.exports = router;
