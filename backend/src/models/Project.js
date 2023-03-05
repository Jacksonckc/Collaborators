const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Project = new Schema({
  projectName: { type: String, required: true },
  projectLink: String,
  projectStartDate: Date,
  projectEndDate: Date,
  projectDescription: { type: String, required: true },
  projectRewardAcorns: { type: Number, required: true },
  isProjectFinished: { type: Boolean, required: true },
  peopleOnProject: { type: [String], required: true }
});

const ProjectModel = mongoose.model('projects', Project);
module.exports = ProjectModel;
