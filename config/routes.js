const express            = require('express');
const router             = express.Router();
const usersController    = require('../controllers/users.controller');
const projectsController = require('../controllers/projects.controller');
const logsController     = require('../controllers/logs.controller');
const authMiddleware     = require('../middlewares/auth.middleware');

// Access routes
router.post('/login', authMiddleware.isNotAuthenticated, usersController.doLogin);
router.post('/logout', authMiddleware.isAuthenticated, usersController.logout);
router.get('/users/:token/validate', usersController.validate);

// User routes
router.get('/users/:username', usersController.profile);
router.post('/users', usersController.create);
router.patch('/users/:userId', usersController.update);
router.delete('/users/:userId', usersController.delete);

// Project routes
router.post('/:userId/projects/new', projectsController.create);
router.get('/user/:userId/projects', authMiddleware.isAuthenticated, projectsController.read);
router.get('projects/:projectId', authMiddleware.isAuthenticated, projectsController.detail);
router.patch('/projects/:projectId', authMiddleware.isAuthenticated, projectsController.update);
router.delete('/projects/:projectId', authMiddleware.isAuthenticated, projectsController.delete);

// Log routes
router.get('/:projectId/logs', authMiddleware.isAuthenticated, logsController.read);
router.get('/:logId/detail', authMiddleware.isAuthenticated, logsController.detail);
router.post('/:projectId/logs/new', authMiddleware.isAuthenticated, logsController.create);
router.patch('/logs/:logId', authMiddleware.isAuthenticated, logsController.update);
router.delete('/logs/:logId/delete', authMiddleware.isAuthenticated, logsController.delete);

module.exports = router;