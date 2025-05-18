// routes/taxRoutes.js
const express = require('express');
const router = express.Router();
const taxController = require('../controllers/taxController');

router.post('/submit', taxController.submitTax);
router.get('/status/:referensi', taxController.getTaxStatus);
router.put('/status/:referensi', taxController.updateTaxStatus);

module.exports = router;
