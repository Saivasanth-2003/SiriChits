const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    total_amount: {
        type: Number,
        required: true,
    },
    monthly_contribution: {
        type: Number,
        required: true,
    },
    duration_in_months: {
        type: Number,
        required: true,
    },
    start_date: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['active', 'inactive'],
        default: 'active',
    },
     users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
});

module.exports = mongoose.model('ChitGroup', userSchema);