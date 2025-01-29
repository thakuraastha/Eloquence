const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: ['written', 'verbal', 'presentation'],
        required: true
    },
    questions: [{
        prompt: {
            type: String,
            required: true
        },
        type: {
            type: String,
            enum: ['text', 'audio', 'video'],
            required: true
        },
        rubric: [{
            criterion: String,
            maxScore: Number,
            description: String
        }],
        timeLimit: Number // in seconds
    }],
    totalScore: {
        type: Number,
        required: true
    },
    isPublic: {
        type: Boolean,
        default: false
    },
    attempts: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        score: Number,
        responses: [{
            questionIndex: Number,
            response: String, // URL for audio/video responses
            score: Number,
            feedback: String
        }],
        completedAt: Date
    }]
}, {
    timestamps: true
});

// Index for efficient querying
testSchema.index({ creator: 1, title: 1 });
testSchema.index({ isPublic: 1 });

const Test = mongoose.model('Test', testSchema);
module.exports = Test; 