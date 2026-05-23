import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import chatRoutes from "./routes/chatRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

// ---------------- SIMPLE CORS (NO COMPLEX LOGIC) ----------------
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://ai-saas-chatbot-czd1uxxkv-varun-saas-projects.vercel.app",
    ],
    credentials: true,
  })
);

// IMPORTANT: preflight must be handled like this
app.options("*", cors());

// ---------------- MIDDLEWARE ----------------
app.use(express.json());
app.use(cookieParser());

// ---------------- ROUTES ----------------
app.use("/api/chat", chatRoutes);
app.use("/api/auth", authRoutes);

// ---------------- DB ----------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

// ---------------- SERVER ----------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});