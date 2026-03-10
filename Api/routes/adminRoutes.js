const express = require("express");
const router = express.Router();

const {
  getAllResumes,
  getResume,
  updateResume,
  deleteResume,
} = require("../controllers/resumeController");

router.get("/resumes", getAllResumes);

router.get("/resume/:id", getResume);

router.put("/resume/:id", updateResume);

router.delete("/resume/:id", deleteResume);

module.exports = router;
