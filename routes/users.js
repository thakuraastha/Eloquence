const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { auth } = require('../middleware/auth');
const User = require('../models/User');

// Update user profile
router.patch('/profile', [
    auth,
    body('name').optional().trim().notEmpty(),
    body('email').optional().isEmail().normalizeEmail()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const allowedUpdates = ['name', 'email'];
        const updates = Object.keys(req.body);
        
        // Check if updates are allowed
        const isValidOperation = updates.every(update => allowedUpdates.includes(update));
        if (!isValidOperation) {
            return res.status(400).json({ message: 'Invalid updates' });
        }

        // If email is being updated, check if it's already in use
        if (req.body.email && req.body.email !== req.user.email) {
            const existingUser = await User.findOne({ email: req.body.email });
            if (existingUser) {
                return res.status(400).json({ message: 'Email already in use' });
            }
        }

        // Apply updates
        updates.forEach(update => {
            req.user[update] = req.body[update];
        });
        
        await req.user.save();
        res.json({
            user: {
                id: req.user._id,
                name: req.user.name,
                email: req.user.email,
                role: req.user.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Change password
router.patch('/password', [
    auth,
    body('currentPassword').notEmpty(),
    body('newPassword').isLength({ min: 6 })
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { currentPassword, newPassword } = req.body;

        // Verify current password
        const isMatch = await req.user.comparePassword(currentPassword);
        if (!isMatch) {
            return res.status(400).json({ message: 'Current password is incorrect' });
        }

        // Update password
        req.user.password = newPassword;
        await req.user.save();

        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get user stats
router.get('/stats', auth, async (req, res) => {
    try {
        const stats = {
            testsCreated: req.user.createdTests.length,
            testsTaken: req.user.takenTests.length,
            averageScore: 0
        };

        if (stats.testsTaken > 0) {
            const totalScore = req.user.takenTests.reduce((sum, test) => sum + (test.score || 0), 0);
            stats.averageScore = totalScore / stats.testsTaken;
        }

        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router; 