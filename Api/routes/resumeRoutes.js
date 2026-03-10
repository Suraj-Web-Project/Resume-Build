const express = require("express");
const router = express.Router();

const {
  createResume,
  downloadResume,
} = require("../controllers/resumeController");

router.post("/create", createResume);
router.get("/download/:id", downloadResume);



module.exports = router;
