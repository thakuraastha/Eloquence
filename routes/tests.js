const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { auth, isCreator } = require('../middleware/auth');
const Test = require('../models/Test');

// Create a test (creator only)
router.post('/', [auth, isCreator], [
    body('title').trim().notEmpty(),
    body('description').trim().notEmpty(),
    body('type').isIn(['written', 'verbal', 'presentation']),
    body('questions').isArray({ min: 1 }),
    body('questions.*.prompt').trim().notEmpty(),
    body('questions.*.type').isIn(['text', 'audio', 'video']),
    body('totalScore').isInt({ min: 1 })
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const test = new Test({
            ...req.body,
            creator: req.user._id
        });

        await test.save();
        
        // Update user's created tests
        await req.user.updateOne({ $push: { createdTests: test._id } });

        res.status(201).json(test);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all public tests
router.get('/public', auth, async (req, res) => {
    try {
        const tests = await Test.find({ isPublic: true })
            .populate('creator', 'name')
            .select('-attempts')
            .sort('-createdAt');
        res.json(tests);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get tests created by current user
router.get('/created', [auth, isCreator], async (req, res) => {
    try {
        const tests = await Test.find({ creator: req.user._id })
            .sort('-createdAt');
        res.json(tests);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get tests taken by current user
router.get('/taken', auth, async (req, res) => {
    try {
        const user = await req.user.populate('takenTests.test');
        res.json(user.takenTests);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get specific test
router.get('/:id', auth, async (req, res) => {
    try {
        const test = await Test.findById(req.id)
            .populate('creator', 'name');
        
        if (!test) {
            return res.status(404).json({ message: 'Test not found' });
        }

        if (!test.isPublic && test.creator.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Access denied' });
        }

        res.json(test);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Submit test attempt
router.post('/:id/submit', auth, [
    body('responses').isArray(),
    body('responses.*.questionIndex').isInt(),
    body('responses.*.response').notEmpty()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const test = await Test.findById(req.params.id);
        if (!test) {
            return res.status(404).json({ message: 'Test not found' });
        }

        const attempt = {
            user: req.user._id,
            responses: req.body.responses,
            completedAt: new Date()
        };

        // Add attempt to test
        test.attempts.push(attempt);
        await test.save();

        // Add to user's taken tests
        await req.user.updateOne({
            $push: {
                takenTests: {
                    test: test._id,
                    completedAt: new Date()
                }
            }
        });

        res.json(attempt);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Update test (creator only)
router.patch('/:id', [auth, isCreator], async (req, res) => {
    try {
        const test = await Test.findOne({
            _id: req.params.id,
            creator: req.user._id
        });

        if (!test) {
            return res.status(404).json({ message: 'Test not found' });
        }

        const allowedUpdates = ['title', 'description', 'questions', 'isPublic', 'totalScore'];
        const updates = Object.keys(req.body);
        
        updates.forEach(update => {
            if (allowedUpdates.includes(update)) {
                test[update] = req.body[update];
            }
        });

        await test.save();
        res.json(test);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete test (creator only)
router.delete('/:id', [auth, isCreator], async (req, res) => {
    try {
        const test = await Test.findOneAndDelete({
            _id: req.params.id,
            creator: req.user._id
        });

        if (!test) {
            return res.status(404).json({ message: 'Test not found' });
        }

        // Remove from user's created tests
        await req.user.updateOne({ $pull: { createdTests: test._id } });

        res.json({ message: 'Test deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router; 