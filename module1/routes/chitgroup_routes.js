const express = require('express');
const router = express.Router();
const ChitGroup = require('../models/chitgroup');
const User = require('../models/usermodel');

const {creategroup, groupid, joingroup} = require('../controllers/chitgroup_controllers');

router.post('/create', creategroup); // Create a new chit group
router.get('/:id', groupid); // Get chit group by ID    
router.post('/:id/join', joingroup); // Add a user to chit group


module.exports = router;  


