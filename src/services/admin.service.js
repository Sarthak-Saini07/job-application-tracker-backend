// import User from "../models/user.model.js";
// import Job from "../models/job.model.js";

// // Delete user + their jobs
// export const deleteUserService = async (adminId, userId) => {
  
//   // Prevent admin from deleting themselves
//   if (adminId === userId) {
//     throw new Error("Admin cannot delete themselves");
//   }

//   const user = await User.findById(userId);

//   if (!user) {
//     throw new Error("User not found");
//   }

//   // Prevent deleting another admin
//   if (user.role === "admin") {
//     throw new Error("Cannot delete another admin");
//   }

//   // Delete user's jobs
//   await Job.deleteMany({ user: userId });

//   // Delete user
//   await User.findByIdAndDelete(userId);

//   return true;
// };
import User from "../models/user.model.js";
import Job from "../models/job.model.js";

// Get all users
export const getAllUsersService = async () => {
  return await User.find().select("-password");
};

// Get all jobs for admin
export const getAllJobsService = async () => {
  // Populate the 'createdBy' field so admin can see who applied
  return await Job.find().populate("createdBy", "name email").sort({ createdAt: -1 });
};

// Admin platform stats
// export const getAdminStatsService = async () => {
//   const totalUsers = await User.countDocuments();
//   const totalJobs = await Job.countDocuments();

//   const jobStatusStats = await Job.aggregate([
//     {
//       $group: {
//         _id: "$status",
//         count: { $sum: 1 }
//       }
//     }
//   ]);

//   const stats = {
//     totalUsers,
//     totalJobs,
//     applied: 0,
//     interview: 0,
//     offer: 0,
//     rejected: 0
//   };

//   jobStatusStats.forEach((item) => {
//     const status = item._id.toLowerCase();

//     if (status === "applied") stats.applied = item.count;
//     if (status === "interview") stats.interview = item.count;
//     if (status === "offer") stats.offer = item.count;
//     if (status === "rejected") stats.rejected = item.count;
//   });

//   return stats;
// };
export const getAdminStatsService = async () => {
  const totalUsers = await User.countDocuments();
  const totalJobs = await Job.countDocuments();

  const jobStatusStats = await Job.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 }
      }
    }
  ]);

  const topCompanies = await Job.aggregate([
    {
      $group: {
        _id: "$companyName",
        count: { $sum: 1 }
      }
    },
    { $sort: { count: -1 } },
    { $limit: 5 }
  ]);

  const stats = {
    totalUsers,
    totalJobs,
    applied: 0,
    interview: 0,
    offer: 0,
    rejected: 0,
    topCompanies
  };

  jobStatusStats.forEach((item) => {
    const status = item._id.toLowerCase();

    if (status === "applied") stats.applied += item.count;
    if (status === "interview" || status === "interviewing") stats.interview += item.count;
    if (status === "offer") stats.offer += item.count;
    if (status === "rejected") stats.rejected += item.count;
  });

  return stats;
};
// Admin update job status
export const updateJobStatusService = async (jobId, status) => {
  return await Job.findByIdAndUpdate(
    jobId,
    { status },
    { new: true }
  );
};
// export const deleteUserService = async (adminId, userId) => {
  
//   // Prevent admin from deleting themselves
//   if (adminId === userId) {
//     throw new Error("Admin cannot delete themselves");
//   }

//   const user = await User.findById(userId);

//   if (!user) {
//     throw new Error("User not found");
//   }

//   // Prevent deleting another admin
//   if (user.role === "admin") {
//     throw new Error("Cannot delete another admin");
//   }

//   // Delete user's jobs
//   await Job.deleteMany({ createdBy: userId });

//   // Delete user
//   await User.findByIdAndDelete(userId);

//   return true;
// };

export const deleteUserService = async (adminId, userId) => {

  // prevent admin deleting themselves
  if (adminId === userId) {
    throw new Error("Admin cannot delete themselves");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  // prevent deleting another admin
  if (user.role === "admin") {
    throw new Error("Admins cannot delete other admins");
  }

  // delete user's jobs
  await Job.deleteMany({ createdBy: userId });

  // delete user
  await User.findByIdAndDelete(userId);

  return true;
};