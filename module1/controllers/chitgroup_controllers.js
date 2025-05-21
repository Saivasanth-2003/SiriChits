

const express = require('express');
const router = express.Router();
const ChitGroup = require('../models/chitgroup'); // ChitGroup model
const User = require('../models/usermodel'); // User model

// POST /group/create – Create a new chit group
const creategroup = async (req, res) => {
    try {
        const chitGroup = new ChitGroup(req.body);
        await chitGroup.save();
        res.status(201).json(chitGroup);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// GET /api/group/:id – Get chit group by ID
const groupid = async (req, res) => {
    try {
        const group = await ChitGroup.findOne({ id: req.params.id }).populate('users');
        if (!group) return res.status(404).json({ message: 'Group not found' });
        res.json(group);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const joingroup = async (req, res) => {
    try {
        const { userId } = req.body;

        // Find chit group
        const group = await ChitGroup.findOne({ id: req.params.id });
        if (!group) return res.status(404).json({ message: 'Group not found' });

        // Find user
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Check if already joined
        if (group.users.includes(userId)) {
            return res.status(400).json({ message: 'User already joined the group' });
        }

        // Add user to group
        group.users.push(userId);
        await group.save();

        res.json({ message: 'User joined the group successfully', group });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    creategroup,
    groupid,
    joingroup
};
