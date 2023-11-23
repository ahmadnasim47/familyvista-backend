// routes/treeRoutes.js

const express = require('express');
const router = express.Router();
const treeController = require('../Controllers/MemberController');

// Routes for tree operations


router.post('/addRootMember', treeController.addRootMember);
router.post('/addChildMember/:id', treeController.addChildMember);
router.put('/updateMember/:id', treeController.updateMember); // Update route
router.delete('/deleteMember/:id', treeController.deleteMember); // Delete route
router.get('/getTree',treeController.getTree);

module.exports = router;
