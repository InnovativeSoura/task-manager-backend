import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dns from "dns";

dns.setServers([
  "1.1.1.1","8.8.8.8"
]);

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors({
      origin: [
      "http://localhost:5173",
      "https://profound-choux-b2c180.netlify.app",
      ]
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});