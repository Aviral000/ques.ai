const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const episodeSchema = new Schema({
    title: { type: String, required: true },
    link: { type: String, required: true },
    description: { type: String, required: true }
}, {
    timestamps: true
});

const projectSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    projectName: { type: String, required: true },
    episodes: {type: [episodeSchema]}
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
