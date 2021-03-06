const Project = require("../models/project.model");
const createError = require("http-errors");

module.exports.create = (req, res, next) => {
  const project = new Project({
    projectName: req.body.projectName,
    costPerHour: req.body.costPerHour,
    owner: req.params.userId,
  });

  project
    .save()
    .then((project) => {
      if (project) {
        res.json(project);
      } else {
        throw createError(404, "Project not found");
      }
    })
    .catch(next);
};

module.exports.read = (req, res, next) => {
  Project.find({ owner: req.params.userId })
    .then((projects) => {
      if (projects) {
        res.json(projects);
      } else {
        throw createError(404, "Projects not found");
      }
    })
    .catch(next);
};

module.exports.detail = (req, res, next) => {
  Project.findById(req.params.projectId)
    .then((project) => {
      if (project) {
        res.json(project);
      } else {
        throw createError(404, "Project not found");
      }
    })
    .catch(next);
};

module.exports.update = (req, res, next) => {
  Project.findByIdAndUpdate(req.params.projectId, req.body, { new: true })
    .then((project) => {
      if (project) {
        res.json(project);
      } else {
        throw createError(404, "Project not found");
      }
    })
    .catch(next);
};

module.exports.delete = (req, res, next) => {
  Project.findByIdAndDelete(req.params.projectId)
    .then((project) => {
      if (project) {
        res.status(200).json();
      } else {
        throw createError(404, "Project not found");
      }
    })
    .catch(next);
};
