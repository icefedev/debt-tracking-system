const express = require('express');
const notificationController = require('../controllers/notificationController');

const router = express.Router();

// POST request สำหรับสร้างการแจ้งเตือนใหม่
router.post('/', notificationController.createNotification);

// GET request สำหรับดึงการแจ้งเตือนทั้งหมดที่ยังไม่ได้ดู
router.get('/', notificationController.getNotifications);

// PUT request สำหรับอัปเดตสถานะการแจ้งเตือนว่าได้ดูแล้ว
router.put('/:id', notificationController.markNotificationAsSeen);

module.exports = router;
