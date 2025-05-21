const express = require('express');
const router = express.Router();
const { createBid, getBidsByGroup } = require('../controllers/actionscontrollers');

router.post('/:id/bid', createBid);
router.get('/group/:id/bids', getBidsByGroup);

module.exports = router;
