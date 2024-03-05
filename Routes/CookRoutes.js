const express = require('express');
const router = express.Router();
const cookingController = require('../Controllers/CookController');
// const router = require('./treeRoutes');




// Routes
router.post('/create', cookingController.createrecipe); // Create a new story
router.get('/get', cookingController.getAllRecipes); // Get all stories
router.get('/single/:id', cookingController.getReciepyById); // Get a specific story by ID
router.put('/update/:id', cookingController.updateReciepy); // Update a story by ID
router.delete('/delete/:id', cookingController.deleteReciepy); // Delete a story by ID

// Start the server

module.exports = router;