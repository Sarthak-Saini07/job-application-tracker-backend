import {
  createJobService,
  getJobsService,
  updateJobService,
  deleteJobService,
  getJobStatsService,
} from "../services/job.service.js";
import Notification from "../models/notification.model.js";
/**
 * Create Job
 */
export const createJobService = async (data, userId) => {
  // Create Job
  const job = await Job.create({
    ...data,
    user: userId
  });

  // Get user details (to show name in notification)
  const user = await User.findById(userId);

  // 🔔 Create Notification for Admin
  await Notification.create({
    message: `${user.name} applied for ${job.role} at ${job.companyName}`,
    type: "JOB_CREATED",
    user: userId
  });

  return job;
};

/**
 * Get All Jobs
 */
export const getJobs = async (req, res) => {
  try {
    const jobs = await getJobsService(req.user._id);

    return res.status(200).json({
      success: true,
      data: jobs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Update Job
 */
export const updateJob = async (req, res) => {
  try {
    const updatedJob = await updateJobService(
      req.params.id,
      req.body,
      req.user._id
    );

    return res.status(200).json({
      success: true,
      message: "Job updated successfully",
      data: updatedJob,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Delete Job
 */
export const deleteJob = async (req, res) => {
  try {
    const result = await deleteJobService(req.params.id, req.user._id);

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get Dashboard Stats
 */
export const getJobStats = async (req, res) => {
  try {
    const stats = await getJobStatsService(req.user._id);

    return res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};