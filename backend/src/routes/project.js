const express = require('express');
const router = express.Router();
const ProjectController = require('../controllers/projectController');
const authenticateJWT = require('../middlewares/authMiddleware');

router.post('', authenticateJWT, ProjectController.createProject);
router.get('/all', authenticateJWT, ProjectController.findProjects);
router.post('/:projectId/episodes', authenticateJWT, ProjectController.addEpisode);
router.get("/:projectId/episodes", authenticateJWT, ProjectController.getEpisode);
router.put('/:projectId/episodes/:episodeId', authenticateJWT, ProjectController.editEpisodeDescription);
router.delete('/:projectId/episodes/:episodeId', authenticateJWT, ProjectController.deleteEpisode);
router.get('/:projectId/episodes/:episodeId', authenticateJWT, ProjectController.getEpisodeById);

module.exports = router;
