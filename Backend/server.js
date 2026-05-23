import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import chatRoutes from "./routes/chatRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

// ---------- Allowed Origins ----------
const allowedOrigins = [
  "http://localhost:5173",
  "https://ai-saas-chatbot-zeta.vercel.app",
  "https://ai-saas-chatbot-3t44stgb7-varun-saas-projects.vercel.app",
];

// ---------- CORS Middleware ----------
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// Handle preflight requests
app.options("/", cors());

// ---------- Core Middleware ----------
app.use(express.json());
app.use(cookieParser());

// ---------- Routes ----------
app.use("/api/chat", chatRoutes);
app.use("/api/auth", authRoutes);

// ---------- DB ----------
const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing in environment variables");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB error:", err.message);
    process.exit(1);
  }
};

// ---------- Start Server ----------
const PORT = process.env.PORT || 5000;

const start = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

start();