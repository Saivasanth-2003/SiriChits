const userModel = require('../models/usermodel');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

// dotenv.config();

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.EMAIL_PASS
//   }
// });




const register = async (req, res) => {
    try {
    const { name,email, password, phone} = req.body;
    const isUserExists = await userModel.findOne({ email });   
    if(isUserExists) {
        return res.status(409).json({error: 'User already exists with this email.'});
    }
    const user = new userModel({name, email, password,phone });
    const userDetails = await user.save();
    return res.status(201).json({message: 'User Registered successfully!', userDetails});
    } catch (error) {
        return res.json({error: error.message});
    }
}
const login = async (req, res) => {
    try {
        const { data, password } = req.body;

        let user;

        // Simple checks to determine the type of identifier
        if (!isNaN(data)) {
            // If it's a number, treat as phone
            user = await userModel.findOne({ phone: Number(data) });
        } else if (data.includes('@')) {
            // If it includes '@', treat as email
            user = await userModel.findOne({ email: data });
        } else {
            // Otherwise, treat as username/name
            user = await userModel.findOne({ name: data });
        }

        if (!user) {
            return res.status(404).json({ error: 'Invalid credentials.' });
        }

        // Replace this with bcrypt.compare if you're hashing passwords
        if (user.password !== password) {
            return res.status(401).json({ error: 'Invalid Password.' });
        }

        return res.status(200).json({ message: 'Login successful', user });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.lid;  
    
    const user = await userModel.findById(userId).select('-password'); 
   

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const otpsend = async (req, res) => {
    const { Phone } = req.body;  
    const user = await userModel.findOne({ Phone});

    if (!user) return res.status(404).json({ error: 'User not found' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore.set(Phone, otp);

   
    client.messages.create({
        body: `Your OTP for password reset is: ${otp}`,
        from: 'YOUR_TWILIO_PHONE_NUMBER', 
        to: Phone                   
    })
    .then(message => {
        console.log('OTP Sent:', message.sid);
        res.json({ message: 'OTP sent to your phone' });
    })
    .catch(error => {
        console.error('Error sending OTP:', error);
        res.status(500).json({ error: 'Failed to send OTP' });
    });
};

module.exports = {register, login, getUserProfile, otpsend};