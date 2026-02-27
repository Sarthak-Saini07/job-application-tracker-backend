import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ["JOB_CREATED", "JOB_UPDATED", "JOB_DELETED"],
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    isRead: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);