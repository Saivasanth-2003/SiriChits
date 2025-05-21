


const Action = require('../models/actions');
const ChitGroup = require('../models/chitgroup');
const User = require('../models/usermodel');

// POST /api/group/:id/bid – Create a bid for a chit group
const createBid = async (req, res) => {
    try {
        const groupId = req.params.id;
        const { month_no, winner_id, bid_amount, commission, divided_per_number } = req.body;

        // Validate chit group
        const group = await ChitGroup.findById(groupId); // Assuming groupId is ObjectId
        if (!group) return res.status(404).json({ message: 'Group not found' });

        // Validate winner
        const winner = await User.findById(winner_id);
        if (!winner) return res.status(404).json({ message: 'Winner not found' });

        // Create and save bid
        const bid = new Action({
            chit_group_id: groupId,
            month_no,
            winner_id,
            bid_amount,
            commission,
            divided_per_number
        });

        await bid.save();
        res.status(201).json({ message: 'Bid created', bid });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// GET /api/group/:id/bids – Get all bids for a chit group
const getBidsByGroup = async (req, res) => {
    try {
        const bids = await Action.find({ chit_group_id: req.params.id })
            .populate('winner_id', 'name email')
            .sort({ month_no: 1 });

        res.json(bids);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createBid,
    getBidsByGroup
};
