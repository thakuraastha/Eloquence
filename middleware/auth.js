const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            throw new Error();
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded.userId });

        if (!user) {
            throw new Error();
        }

        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Please authenticate.' });
    }
};

// Middleware to check if user is a test creator
const isCreator = async (req, res, next) => {
    if (req.user.role !== 'creator') {
        return res.status(403).json({ message: 'Access denied. Creator privileges required.' });
    }
    next();
};

module.exports = { auth, isCreator }; 