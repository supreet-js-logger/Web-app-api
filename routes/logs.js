const express = require("express");

const {
  getAllLogs,
  createLog,
  getLog,
  deleteLog,
  updateLog,
} = require("../controllers/logs");

const router = express.Router();

router.route("/").get(getAllLogs).post(createLog);

router.route("/:id").get(getLog).put(updateLog).delete(deleteLog);

module.exports = router;
