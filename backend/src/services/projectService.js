const Project = require('../models/Project');

class ProjectService {
    static async createProject(userId, projectName) {
        const newProject = new Project({
            userId,
            projectName,
            episodes: []
        });
        await newProject.save();
        return newProject;
    }

    static async findAllProjects(userId) {
        const projects = await Project.find({ userId: userId });

        if(!projects) {
            throw new Error("Empty project list");
        }

        return projects;
    }

    static async addEpisodeToProject(projectId, episodeData) {
        const project = await Project.findById(projectId);
        if (!project) {
            throw new Error('Project not found');
        }

        project.episodes.push(episodeData);
        await project.save();
        return project;
    }

    static async getAllEpisodes(projectId) {
        const project = await Project.findById(projectId);

        if (!project) {
            throw new Error('Project not found');
        }

        return project;
    }

    static async updateEpisodeDescription(projectId, episodeId, description) {
        const project = await Project.findById(projectId);
        if (!project) {
            throw new Error('Project not found');
        }

        const episode = project.episodes.find(ep => ep._id.toString() === episodeId);
        if (!episode) {
            throw new Error('Episode not found');
        }

        episode.description = description;

        await project.save();
        return project;
    }
    
    static async removeEpisodeFromProject(projectId, episodeId) {
        const project = await Project.findById(projectId);
        if (!project) {
            throw new Error('Project not found');
        }
    
        project.episodes = project.episodes.filter(episode => episode._id.toString() !== episodeId);
        await project.save();
        return project;
    }

    static async getEpisodeById(projectId, episodeId) {
        const project = await Project.findById(projectId);
        if (!project) {
            throw new Error('Project not found');
        }
    
        const episode = project.episodes.find(ep => ep._id.toString() === episodeId);
        if (!episode) {
            throw new Error('Episode not found');
        }
    
        return episode;
    }
    
    
}

module.exports = ProjectService;
