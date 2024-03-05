// routes/treeRoutes.js

const express = require('express');
const router = express.Router();
const RootMemberController = require("../Controllers/rootMemberController")
const MemberController = require('../Controllers/MemberController');
const { isAuthenticatedUser } = require('../middleware/auth');

// Routes for tree operations 
//isAuthenticatedUser,


router.post('/addRootMember', RootMemberController.addRootMember);
router.post('/addChildMember/:id', MemberController.addChildMember);
router.put('/updateMember/:id', MemberController.updateMember); // Update route
router.delete('/deleteMember/:id', MemberController.deleteMember); // Delete route
router.get('/getTree',MemberController.getTree);

module.exports = router;