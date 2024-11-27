const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// GET: ดึงข้อมูลลูกค้าทั้งหมด
const getCustomers = async (req, res) => {
  try {
    const customers = await prisma.customer.findMany();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving customers" });
  }
};

// POST: เพิ่มข้อมูลลูกค้า
const createCustomer = async (req, res) => {
  const { name, phone, email } = req.body;
  try {
    const customer = await prisma.customer.create({
      data: { name, phone, email },
    });
    res.status(201).json(customer);
  } catch (error) {
    res.status(500).json({ error: "Error creating customer" });
  }
};

// EXPORT Controllers
module.exports = {
  getCustomers,
  createCustomer,
};
