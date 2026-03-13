import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/auth.routes.js";
import jobRoutes from "./routes/job.routes.js";
import adminRoutes from "./routes/admin.routes.js";
const app = express();

/* -------------------- Security Middleware -------------------- */

// Helmet (secure HTTP headers)
app.use(helmet());

// Rate Limiting (basic protection)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
});
app.use(limiter);

// CORS
app.use(
  cors({
    origin: [
      "https://job-application-tracker-frontend-zeta.vercel.app",
      "https://job-application-tracker-fr-git-c5384d-sarthak-saini07s-projects.vercel.app"
    ],
    credentials: true
  })
);

// Body Parser
app.use(express.json());

/* -------------------- Routes -------------------- */

app.get("/", (req, res) => {
  res.json({ message: "Job Application Tracker API running..." });
});

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/admin", adminRoutes);
/* -------------------- Export App -------------------- */

export default app;