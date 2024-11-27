const prisma = require('../config/prismaClient');

// ฟังก์ชันสำหรับสร้างการแจ้งเตือน
const createNotification = async (req, res) => {
  const { message, date } = req.body;

  if (!message || !date) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const notification = await prisma.notification.create({
      data: {
        message,
        date: new Date(date),  // แปลงวันที่เป็น Date object
      },
    });

    res.status(201).json(notification);
  } catch (error) {
    console.error('Error creating notification:', error);
    res.status(500).json({ error: 'Error creating notification' });
  }
};

// ฟังก์ชันสำหรับดึงการแจ้งเตือนทั้งหมด
const getNotifications = async (req, res) => {
  try {
    const notifications = await prisma.notification.findMany({
      where: { seen: false },  // กรองเฉพาะการแจ้งเตือนที่ยังไม่ได้ดู
      orderBy: { date: 'asc' },  // เรียงตามวันที่
    });

    res.status(200).json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ error: 'Error fetching notifications' });
  }
};

// ฟังก์ชันสำหรับอัปเดตสถานะของการแจ้งเตือนว่าได้ดูแล้ว
const markNotificationAsSeen = async (req, res) => {
  const { id } = req.params;

  try {
    const notification = await prisma.notification.update({
      where: { id: Number(id) },
      data: { seen: true },
    });

    res.status(200).json(notification);
  } catch (error) {
    console.error('Error marking notification as seen:', error);
    res.status(500).json({ error: 'Error marking notification as seen' });
  }
};

module.exports = {
  createNotification,
  getNotifications,
  markNotificationAsSeen,
};
