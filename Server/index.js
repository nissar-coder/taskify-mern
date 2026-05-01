import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js"
import taskRoutes from "./routes/task.routes.js";

dotenv.config();
const app = express();
connectDB();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes)


app.get("/", (req, res) => {
  res.send("Taskify server is running");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});