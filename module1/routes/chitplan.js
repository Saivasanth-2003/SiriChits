const express = require('express');
const router = express.Router();
const ChitPlan = require('../models/chitplan.js');
const isAdmin = require('../middleware/isAdmin.js');
// import  isAdmin from '../middleware/isAdmin.js';

// Get all chit plans (for users to view)
router.get('/', async (req, res) => {
  try {
    const plans = await ChitPlan.find().sort({ createdAt: -1 });
    res.json(plans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Create a new chit plan
router.post('/create', isAdmin,  async (req, res) => {
  try {
    const {
      name, description, chitAmount, monthlyContribution, durationMonths,
      adminCommissionPercent, memberDividendPercent, maxSubscribers,
      startDate, endDate, createdBy
    } = req.body;

    const chitPlan = new ChitPlan({
      name,
      description,
      chitAmount,
      monthlyContribution,
      durationMonths,
      adminCommissionPercent,
      memberDividendPercent,
      maxSubscribers,
      startDate,
      endDate,
      createdBy: req.user ? req.user._id : null

    });

    await chitPlan.save();
    res.status(201).json({ success: true, chitPlan });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
