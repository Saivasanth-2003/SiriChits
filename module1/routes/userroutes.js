

const express = require('express');
const router = express.Router();


const { register, login, getUserProfile,otpsend} = require('../controllers/userControllers');




router.post('/register', register);
router.post('/login', login);
router.get('/profile/:id', getUserProfile); 
router.post('/otpsend', otpsend); 

// ✅ Correct export:
module.exports = router;
