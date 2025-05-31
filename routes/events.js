// routes/events.js
const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/eventsController');

router.post('/events', eventsController.createEvent);
router.get('/analytics/event-counts', eventsController.getEventCounts);
router.get('/analytics/event-counts-by-type', eventsController.getEventCountsByType);

module.exports = router;
