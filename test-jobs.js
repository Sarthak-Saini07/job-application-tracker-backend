import mongoose from "mongoose";
import Job from "./src/models/job.model.js";
import User from "./src/models/user.model.js";

async function test() {
  await mongoose.connect("mongodb://127.0.0.1:27017/job-tracker", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log("Connected");
  const jobs = await Job.find().populate("createdBy", "name email");
  console.log("Jobs found:", jobs.length);
  if (jobs.length > 0) {
    console.log("First job data:", JSON.stringify(jobs[0], null, 2));
  }
  
  const rawJobs = await Job.find().lean();
  if (rawJobs.length > 0) {
    console.log("First raw job:", JSON.stringify(rawJobs[0], null, 2));
  }
  
  process.exit();
}
test();
