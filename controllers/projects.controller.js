const Project     = require('../models/project.model');
// const User        = require('../models/user.model');
const createError = require('http-errors');

module.exports.create = (req, res, next) => {
  
  const project = new Project({
    projectName: req.body.projectName,
    costPerHour: req.body.costPerHour,
    owner: req.params.userId
  });

  project.save()
    .then(project => {
      if (project) {
        res.json(project);
      } else {
        throw createError(404, 'Project not found');
      }
    })
    // .then(project => {
    //   if (project) {
    //     User.findByIdAndUpdate(req.params.userId, { projects: projects.push(project.id) }, { new: true })
    //   } else {
    //     throw createError(404, `Couldn\'t update ${owner} project list`)
    //   }
    // })
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
  Project.findByIdAndUpdate(req.params.projectId, req.body, { new: true })
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