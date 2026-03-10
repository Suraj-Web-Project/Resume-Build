const Resume = require("../models/Resume");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const { PDFDocument: PDFLib } = require("pdf-lib");

// CREATE RESUME
exports.createResume = async (req, res) => {
  try {
    const resume = new Resume(req.body);
    await resume.save();

    res.status(201).json(resume);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// DOWNLOAD RESUME (PASSWORD PROTECTED PDF)

exports.downloadResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    const password = `${resume.name}-${resume.dob}`;

    const tempPath = path.join(__dirname, "../resume-temp.pdf");
    const protectedPath = path.join(__dirname, "../resume-protected.pdf");

    // STEP 1: Generate PDF using pdfkit

    const doc = new PDFDocument();

    doc.pipe(fs.createWriteStream(tempPath));

    doc.fontSize(24).text(resume.name);
    doc.moveDown();

    doc.fontSize(12).text(`Email: ${resume.email}`);
    doc.text(`Phone: ${resume.phone}`);

    doc.moveDown();
    doc.fontSize(16).text("Education");
    doc.fontSize(12).text(resume.education || "");

    doc.moveDown();
    doc.fontSize(16).text("Experience");
    doc.fontSize(12).text(resume.experience || "");

    doc.moveDown();
    doc.fontSize(16).text("Skills");
    doc.fontSize(12).text(resume.skills || "");

    doc.end();

    // STEP 2: Wait until PDF created then encrypt

    doc.on("finish", async () => {
      const existingPdf = await PDFLib.load(fs.readFileSync(tempPath));

      existingPdf.encrypt({
        userPassword: password,
        ownerPassword: password,
      });

      const pdfBytes = await existingPdf.save();

      fs.writeFileSync(protectedPath, pdfBytes);

      // STEP 3: Send file to frontend

      res.download(protectedPath, "resume.pdf");
    });
  } catch (error) {
    console.error("PDF ERROR:", error);

    res.status(500).json({
      message: "Error generating PDF",
    });
  }
};

// GET ALL RESUMES (ADMIN)

exports.getAllResumes = async (req, res) => {
  try {
    const resumes = await Resume.find();
    res.json(resumes);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// GET ONE RESUME

exports.getResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    res.json(resume);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// UPDATE RESUME

exports.updateResume = async (req, res) => {
  try {
    const resume = await Resume.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(resume);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// DELETE RESUME

exports.deleteResume = async (req, res) => {
  try {
    await Resume.findByIdAndDelete(req.params.id);

    res.json({
      message: "Resume deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};
