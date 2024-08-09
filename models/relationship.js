const mongoose = require('mongoose');

const relationshipSchema = new mongoose.Schema({
    followerId: { type: String, required: true },
    followedId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Relationship = mongoose.model('Relationship', relationshipSchema);

module.exports = Relationship;
