const express = require('express');
const router = express.Router();
const storiesController = require('../Controllers/StoriesController');
// const router = require('./treeRoutes');




// Routes
router.post('/create', storiesController.createStory); // Create a new story
router.get('/get', storiesController.getAllStories); // Get all stories
router.get('/single/:id', storiesController.getStoryById); // Get a specific story by ID
router.put('/update/:id', storiesController.updateStory); // Update a story by ID
router.delete('/delete/:id', storiesController.deleteStory); // Delete a story by ID

// Start the server

module.exports = router;