// controllers/eventsController.js
const Event = require('../models/Event');

// POST /events
exports.createEvent = async (req, res) => {
    try {
        const { user_id, event_type, payload } = req.body;

        // Validate required fields
        if (!user_id || !event_type || !payload) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Additional validation based on event_type
        if (event_type === 'view' && !payload.url) {
            return res.status(400).json({ message: 'Missing url in payload for view event' });
        }

        if (event_type === 'click' && !payload.element_id) {
            return res.status(400).json({ message: 'Missing element_id in payload for click event' });
        }

        if (event_type === 'location' && (!payload.latitude || !payload.longitude)) {
            return res.status(400).json({ message: 'Missing latitude or longitude in payload for location event' });
        }

        const event = new Event({ user_id, event_type, payload });
        await event.save();
        res.status(202).json({ message: 'Event recorded successfully' });
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// GET /analytics/event-counts
exports.getEventCounts = async (req, res) => {
    try {
        const { event_type, start_date, end_date } = req.query;
        const filter = {};

        if (event_type) {
            filter.event_type = event_type;
        }

        if (start_date || end_date) {
            filter.timestamp = {};
            if (start_date) {
                filter.timestamp.$gte = new Date(start_date);
            }
            if (end_date) {
                filter.timestamp.$lte = new Date(end_date);
            }
        }

        const count = await Event.countDocuments(filter);
        res.status(200).json({ total_events: count });
    } catch (error) {
        console.error('Error fetching event counts:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// GET /analytics/event-counts-by-type
exports.getEventCountsByType = async (req, res) => {
    try {
        const { start_date, end_date } = req.query;
        const match = {};

        if (start_date || end_date) {
            match.timestamp = {};
            if (start_date) {
                match.timestamp.$gte = new Date(start_date);
            }
            if (end_date) {
                match.timestamp.$lte = new Date(end_date);
            }
        }

        const results = await Event.aggregate([
            { $match: match },
            {
                $group: {
                    _id: '$event_type',
                    count: { $sum: 1 },
                },
            },
        ]);

        const response = {};
        results.forEach((item) => {
            response[item._id] = item.count;
        });

        res.status(200).json(response);
    } catch (error) {
        console.error('Error fetching event counts by type:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
