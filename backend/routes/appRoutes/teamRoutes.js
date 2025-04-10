const express = require('express');
const router = express.Router();
const { authenticateJWT } = require('../../middleware/authMiddleware');
const multer = require('multer');
const upload = multer();
const { createTeam, addTeamMembers, removeTeamMember, membersList, teamsList, teamMembers, reassignCaptain, leaveTeam, otherMembers } = require('../../controllers/app/team');



//Teams
router.route('/createTeam').post(authenticateJWT, upload.single('teamLogo'), createTeam);
router.route('/membersList').get(authenticateJWT, membersList);
router.route('/addTeamMembers').post(authenticateJWT, addTeamMembers);
router.route('/removeTeamMember').delete(authenticateJWT, removeTeamMember);
router.route('/teamsList').get(authenticateJWT, teamsList);
router.route('/teamMembers').get(authenticateJWT, teamMembers);
router.route('/reassignCaptain').patch(authenticateJWT, reassignCaptain);
router.route('/leaveTeam').delete(authenticateJWT, leaveTeam);
router.route('/otherMembers').get(authenticateJWT, otherMembers);



module.exports = router