const express            = require('express');
const router             = express.Router();
const usersController    = require('../controllers/users.controller');
const projectsController = require('../controllers/projects.controller');
const logsController     = require('../controllers/logs.controller');

// Access routes
router.post('/login', usersController.doLogin);
router.post('/logout', usersController.logout);

// User routes
router.get('/users/:username', usersController.profile);
router.post('/users', usersController.create);
router.patch('/users/:userId', usersController.update);
router.delete('/users/:userId', usersController.delete);

// Project routes
router.post('/:userId/projects/new', projectsController.create);
router.get('/user/:userId/projects', projectsController.read);
router.patch('/projects/:projectId', projectsController.update);
router.delete('/projects/:projectId', projectsController.delete);

// Log routes
router.get('/:projectId/logs', logsController.read);
router.post('/:projectId/logs/new', logsController.create);
router.patch('/logs/:logId/update', logsController.update);
router.patch('/logs/:logId/status', logsController.updateStatus);
router.delete('/logs/:logId/delete', logsController.delete);

module.exports = router;