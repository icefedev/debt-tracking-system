const express = require('express');
const { getCustomers, createCustomer } = require('../controllers/customerController');
const router = express.Router();

router.get('/', getCustomers); // GET /customers
router.post('/', createCustomer); // POST /customers

module.exports = router;
