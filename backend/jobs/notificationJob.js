const cron = require("node-cron");
const prisma = require("../config/prismaClient");

// ฟังก์ชันสำหรับการตรวจสอบการติดตามหนี้และส่งการแจ้งเตือน
const sendNotifications = async () => {
  const now = new Date();
  const followUps = await prisma.followUp.findMany({
    where: {
      nextFollowUp: {
        lte: now, // ตรวจสอบว่าการติดตามหนี้ใกล้ถึงเวลาหรือไม่
      },
    },
  });

  followUps.forEach(async (followUp) => {
    // สร้างการแจ้งเตือน
    await prisma.notification.create({
      data: {
        message: `It's time to follow up with ${followUp.customer.name}. Follow-up details: ${followUp.details}`,
        date: new Date(),
      },
    });
  });
};

// Export ฟังก์ชันที่ต้องการใช้
module.exports = {
  sendNotifications,
};
