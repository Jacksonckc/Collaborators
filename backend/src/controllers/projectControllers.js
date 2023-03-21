const { ProjectModel, UserModel } = require('../models');

const getAllProjects = async (req, res) => {
  try {
    const result = await ProjectModel.find();
    res.status(200).json(result);
  } catch {
    res.status(400).json({ err: 'Fail to retrieve all projects.' });
  }
};

const addProject = async (req, res) => {
  const user = req.user;

  if (user._id.toString() !== req.body.projectAuthorId) {
    return res.status(400).json({ err: 'You are not allow to add a project to another account.' });
  }

  if (!req.body.projectName || !req.body.projectRewardAcorns || !req.body.projectDescription)
    return res
      .status(400)
      .json({ err: 'You need all the necessary information to create a project.' });

  try {
    const isProjectExist = await ProjectModel.findOne({ projectName: req.body.projectName });

    if (isProjectExist) return res.status(400).json({ err: 'Project already exists.' });

    if (user.acorns < req.body.projectRewardAcorns) {
      return res.status(400).json({ err: 'You do not have enough acorns to run the project.' });
    }

    const newProject = new ProjectModel({
      ...req.body,
      isProjectFinished: false
    });

    await UserModel.findOneAndUpdate(user._id, {
      acorns: user.acorns - req.body.projectRewardAcorns
    });

    newProject.save();
    res.status(201).json({ ...newProject._doc });
  } catch {
    res.status(400).json({ err: 'Fail to add a project.' });
  }
};

const deleteProject = async (req, res) => {
  const user = req.user;

  if (user._id.toString() !== req.body.projectAuthorId) {
    return res
      .status(400)
      .json({ err: 'You are not allow to delete a project from another account.' });
  }

  try {
    await ProjectModel.findByIdAndDelete(req.body.projectId);
    res.sendStatus(204);
  } catch {
    res.status(400).json({ err: 'Fail to delete a project.' });
  }
};

module.exports = { getAllProjects, addProject, deleteProject };
