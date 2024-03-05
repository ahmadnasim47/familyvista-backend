// routes/EventRoutes.js

const express = require('express');
const router = express.Router();
const eventController = require('../Controllers/eventController');

// Routes for event operations


router.post('/addEvent/:id', eventController.addEvent);
router.get('/getEvents/:id', eventController.getEvents)

module.exports = router;