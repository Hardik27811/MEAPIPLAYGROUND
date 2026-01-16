const express = require('express')
const profileController = require('../controllers/profile.controller')
const {protect} = require('../middlewares/auth.middleware');

const router = express.Router();

router.get("/search", profileController.searchProfile);

router.get('/getAllProfiles', profileController.getProfiles);

router.post('/createProfile',  protect, profileController.createProfile);

router.get('/myProfile' , protect , profileController.myProfile);

router.get("/projects/skill/:skill", protect , profileController.getProjectsBySkill);

router.get("/skills/top", protect , profileController.getTopSkills);



module.exports = router;