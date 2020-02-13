const express            = require('express');
const router             = express.Router();
const authMiddleware     = require('../middlewares/auth.middleware');
const usersController    = require('../controllers/users.controller');
const projectsController = require('../controllers/projects.controller');
const logsController     = require('../controllers/logs.controller');

// Access routes
router.post('/login', authMiddleware.isNotAuthenticated, usersController.doLogin);
router.post('/logout', authMiddleware.isAuthenticated, usersController.logout);

// User routes
router.get('/users/:userId', usersController.profile);
router.post('/users', usersController.create);
router.patch('/users/:userId', usersController.update);
router.delete('/users/:userId', usersController.delete);

// Project routes
router.get('/:userId/projects/', projectsController.read);
router.post('/:userId/projects/new', projectsController.create);
router.patch('/projects/:projectId', projectsController.update);
router.delete('/projects/:projectId', projectsController.delete);

// Log routes
router.get('/:projectId/logs', logsController.read);
router.post('/:projectId/logs/new', logsController.create);
router.patch('/logs/:logId/update', logsController.update);
router.patch('/logs/:logId/status', logsController.updateStatus);
router.delete('/logs/:logId/delete', logsController.delete);

module.exports = router;