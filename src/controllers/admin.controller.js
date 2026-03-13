import {
  getAllUsersService,
  getAdminStatsService,
  updateJobStatusService,
  deleteUserService,
  getAllJobsService
} from "../services/admin.service.js";
import Notification from "../models/notification.model.js";
export const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersService();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await getAllJobsService();
    res.status(200).json({ success: true, data: jobs });
  } catch (error) {
    console.error("ADMIN GET JOBS ERROR:", error);
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
};

export const getAdminStats = async (req, res) => {
  try {
    const stats = await getAdminStatsService();
    res.status(200).json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch stats" });
  }
};

export const updateJobStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const updatedJob = await updateJobStatusService(
      req.params.id,
      status
    );

    res.status(200).json({
      success: true,
      data: updatedJob
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update job status"
    });
  }
};
export const deleteUser = async (req, res) => {
  try {
    await deleteUserService(req.user._id.toString(), req.params.id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully"
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
// export const getAdminNotifications = async (req, res) => {
//   try {
//     const notifications = await Notification
//       .find()
//       .populate("user", "name email")
//       .sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       data: notifications
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };


export const getAdminNotifications = async (req, res) => {
  try {
    const notifications = await Notification
      .find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: notifications,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};