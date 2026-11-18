const {signup,login} = require('../controllers/usercontroller')
const express = require('express')
const authMiddleware = require('../middlewares/auth')
const router = express.Router()
router.post('/signup',signup)
router.post('/login',login)
router.get('/profile', authMiddleware, (req, res) => {
    res.status(200).json({
        message: "Authentication successful",
        userId: req.user.id,

    });
});
module.exports = router