const Project     = require('../models/project.model');
const createError = require('http-errors');

module.exports.create = (req, res, next) => {
  const project = new Project({
    projectName: req.body.projectName,
    costPerHour: req.body.costPerHour
  });

  project.save()
    .then(project => {
      if (project) {
        res.json(project);
      } else {
        throw createError(404, 'Project not found');
      }
    })
    .catch(next);
}

module.exports.read = (req, res, next) => {
  const user = req.params.id
  
  Project.find(user.projects)
    .then(projects => {
      if (projects) {
        res.json(projects);
      } else {
        throw createError(404, 'Projects not found')
      }
    })
    .catch(next);
}

module.exports.update = (req, res, next) => {
  Project.findByIdAndUpdate(req.params.projectid, req.body)
    .then(project => {
      if (project) {
        res.json(project);
      } else {
        throw createError(404, 'Project not found');
      }
    })
    .catch(next);
}

module.exports.delete = (req, res, next) => {
  Project.findOneAndDelete(req.params.projectid)
    .then(project => {
      if (project) {
        res.status(204).json();
      } else {
        throw createError(404, 'Project not found');
      }
    })
    .catch(next);
}