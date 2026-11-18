
const { signup, login } = require('../controllers/usercontroller');
const express = require('express');
const User = require('../models/usersignup');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

// Get logged-in user's profile
router.get('/profile', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
            .select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        console.log("this is user",user)
        res.status(200).json({
            user: {
                id: user._id,
                name: user.name,
                mobile: user.mobile,
                createdAt: user.createdAt
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch profile",
            error: error.message
        });
    }
});

module.exports = router;
