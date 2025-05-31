// models/Event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    event_type: {
        type: String,
        enum: ['view', 'click', 'location'],
        required: true,
    },
    timestamp: { type: Date, default: Date.now },
    payload: { type: Object, required: true },
});

module.exports = mongoose.model('Event', eventSchema);
