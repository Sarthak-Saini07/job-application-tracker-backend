import express from "express";
import {
  createJob,
  getJobs,
  updateJob,
  deleteJob,
  getJobStats,
} from "../controllers/job.controller.js";

import { protect } from "../middlewares/auth.middleware.js";
import { upload } from "../config/cloudinary.js";

const router = express.Router();

const validateJob = (req, res, next) => {
  const { companyName, role } = req.body;
  if (!companyName || !role) {
    return res.status(400).json({
      success: false,
      message: "companyName and role are required fields",
    });
  }
  next();
};

router.get("/stats", protect, getJobStats);
/**
 * @route   POST /api/jobs
 * @desc    Create a new job
 * @access  Private
 */
router.post("/", protect, upload.single("cv"), validateJob, createJob);

/**
 * @route   GET /api/jobs
 * @desc    Get all jobs for logged-in user
 * @access  Private
 */
router.get("/", protect, getJobs);

/**
 * @route   PUT /api/jobs/:id
 * @desc    Update a job
 * @access  Private
 */
router.put("/:id", protect, updateJob);

/**
 * @route   DELETE /api/jobs/:id
 * @desc    Delete a job
 * @access  Private
 */
router.delete("/:id", protect, deleteJob);

/**
 * @route   GET /api/jobs/stats
 * @desc    Get dashboard statistics
 * @access  Private
 */


export default router;