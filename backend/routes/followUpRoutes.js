const express = require("express");
const followUpController = require("../controllers/followUpController"); // นำเข้า controller

const router = express.Router();

// POST request สำหรับเพิ่ม Follow-up ใหม่
router.post("/", followUpController.createFollowUp);

// GET request สำหรับดึงข้อมูล Follow-ups ทั้งหมด
router.get("/", followUpController.getAllFollowUps);

// GET request สำหรับดึง Follow-up ตาม ID
router.get("/:id", followUpController.getFollowUpById);

module.exports = router;
