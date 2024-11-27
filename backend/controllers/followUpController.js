const prisma = require("../config/prismaClient");

// ฟังก์ชันสำหรับการสร้าง Follow-up ใหม่
const createFollowUp = async (req, res) => {
  const { customerId, date, details, nextFollowUp } = req.body;

  // ตรวจสอบว่าได้รับข้อมูลครบหรือไม่
  if (!customerId || !date || !details || !nextFollowUp) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // สร้าง follow-up ใหม่
    const followUp = await prisma.followUp.create({
      data: {
        customerId: Number(customerId), // แปลง customerId เป็นตัวเลข
        date: new Date(date), // แปลง date ให้เป็น Date object
        details,
        nextFollowUp: new Date(nextFollowUp), // แปลง nextFollowUp ให้เป็น Date object
      },
    });

    // ส่ง response กลับมา
    res.status(201).json(followUp);
  } catch (error) {
    console.error("Error adding follow-up:", error);
    res.status(500).json({ error: "Error adding follow-up" });
  }
};

// ฟังก์ชันสำหรับดึง Follow-ups ทั้งหมด
const getAllFollowUps = async (req, res) => {
  try {
    const followUps = await prisma.followUp.findMany({
      include: {
        customer: true, // ดึงข้อมูลลูกค้าไปด้วย
      },
    });
    res.status(200).json(followUps);
  } catch (error) {
    console.error("Error fetching follow-ups:", error);
    res.status(500).json({ error: "Error fetching follow-ups" });
  }
};

// ฟังก์ชันสำหรับดึง Follow-up ตาม ID
const getFollowUpById = async (req, res) => {
  const { id } = req.params;

  try {
    const followUp = await prisma.followUp.findUnique({
      where: { id: Number(id) },
      include: {
        customer: true, // ดึงข้อมูลลูกค้าไปด้วย
      },
    });

    if (!followUp) {
      return res.status(404).json({ error: "Follow-up not found" });
    }

    res.status(200).json(followUp);
  } catch (error) {
    console.error("Error fetching follow-up:", error);
    res.status(500).json({ error: "Error fetching follow-up" });
  }
};

// Export ฟังก์ชันทั้งหมด
module.exports = {
  createFollowUp,
  getAllFollowUps,
  getFollowUpById,
};
