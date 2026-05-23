import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import chatRoutes from "./routes/chatRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

// ---------------- CORS CONFIG (PRODUCTION SAFE) ----------------
const allowedOrigins = [
  "http://localhost:5173",
  "https://ai-saas-chatbot-zeta.vercel.app",
  "https://ai-saas-chatbot-czd1uxxkv-varun-saas-projects.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow tools like Postman / server-to-server
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ---------------- PRE-FLIGHT (IMPORTANT FOR RENDER) ----------------
app.options("*", cors());

// extra safety for OPTIONS requests
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

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
    console.error("❌ MongoDB error:", err);
    process.exit(1);
  });

// ---------------- SERVER ----------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});