const mongoose = require('mongoose');
// const { options } = require('../routes/userroutes');

const userSchema = new mongoose.Schema({
     
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
   
});
module.exports = mongoose.model('users', userSchema);


