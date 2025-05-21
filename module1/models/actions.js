// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     id: {
//         type: Number,
//         required: true,
//     },
//     chit_group_id: {
//         type:Number,
//         required: true,
//     },
//     month_no: {
//         type: Number,
//         required: true,
//     },
//     winner_id: {
//         type: Number,
//         required: true,
//     },
//     bid_amount: {
//         type: Number,
//         required: true,
//     },
//     commission: {
//         type: Number,
//         required: true,
//     },
//     divided_per_number: {
//         type: Number,
//         required: true,
//     },

// })
// module.exports = mongoose.model('Actions', userSchema);


const mongoose = require('mongoose');

const actionSchema = new mongoose.Schema({
    chit_group_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ChitGroup',
        required: true,
    },
    month_no: {
        type: Number,
        required: true,
    },
    winner_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    bid_amount: {
        type: Number,
        required: true,
    },
    commission: {
        type: Number,
        required: true,
    },
    divided_per_number: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Action', actionSchema);
