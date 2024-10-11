const ProjectService = require('../services/projectService');

class ProjectController {
    static async createProject(req, res) {
        try {
            const { projectName } = req.body;
            const userId = req.user._id;
            const project = await ProjectService.createProject(userId, projectName);
            res.status(201).json({ message: 'Project created successfully', project });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async findProjects(req, res) {
        try {
            const projects = await ProjectService.findAllProjects(req.user._id);
            res.status(200).json({ projects });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async addEpisode(req, res) {
        try {
            const { projectId } = req.params;
            const { title, link, description } = req.body;
            const project = await ProjectService.addEpisodeToProject(projectId, { title, link, description });
            res.status(200).json({ message: 'Episode added successfully', project });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async getEpisode(req, res) {
        try {
            const { projectId } = req.params;
            const project = await ProjectService.getAllEpisodes(projectId);
            res.status(200).json({ project });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async editEpisodeDescription(req, res) {
        try {
            const { projectId, episodeId } = req.params;
            const { description } = req.body;
            const updatedProject = await ProjectService.updateEpisodeDescription(projectId, episodeId, description);
            res.status(200).json({ message: 'Episode description updated successfully', project: updatedProject });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async deleteEpisode(req, res) {
        try {
            const { projectId, episodeId } = req.params;
            const updatedProject = await ProjectService.removeEpisodeFromProject(projectId, episodeId);
            res.status(200).json({ message: 'Episode deleted successfully', project: updatedProject });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async getEpisodeById(req, res) {
        try {
            const { projectId, episodeId } = req.params;
            const episode = await ProjectService.getEpisodeById(projectId, episodeId);
            res.status(200).json({ episode });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    
}

module.exports = ProjectController;
