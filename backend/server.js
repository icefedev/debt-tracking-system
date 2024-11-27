const express = require("express");
const cors = require("cors"); // เพิ่มตัวนี้
const dotenv = require("dotenv");
const customerRoutes = require("./routes/customerRoutes");
const followUpRoutes = require("./routes/followUpRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const cronJob = require('./jobs/notificationJob');
const { sendNotifications } = require('./jobs/notificationJob'); // นำเข้า sendNotifications จาก notificationJob

dotenv.config();

const app = express();

// ใช้ CORS ที่นี่
app.use(
  cors({
    origin: "http://localhost:5173", // URL ของ React frontend (Vite dev server)
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

// Middleware ที่ใช้ parse JSON
app.use(express.json());

// ตั้งค่า routes
app.use("/api/customers", customerRoutes);
app.use("/api/followups", followUpRoutes);
app.use("/api/notifications", notificationRoutes);

// Start Cron Job
sendNotifications();

// Default route
app.use((req, res, next) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Error handling
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
