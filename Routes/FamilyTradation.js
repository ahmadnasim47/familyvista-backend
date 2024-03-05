const express = require('express');
const router = express.Router();
const familyTraditionController = require('../Controllers/FamilyTradation');

// Create a new family tradition
router.post('/traditions', familyTraditionController.createTradition);

// Get all family traditions
router.get('/traditions', familyTraditionController.getAllTraditions);

// Get a specific family tradition by ID
router.get('/traditions/:id', familyTraditionController.getTraditionById);

// Update a specific family tradition by ID
router.put('/traditions/:id', familyTraditionController.updateTradition);

// Delete a specific family tradition by ID
router.delete('/traditions/:id', familyTraditionController.deleteTradition);

module.exports = router;
