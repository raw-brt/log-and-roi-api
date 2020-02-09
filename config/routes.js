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
router.post('/users', authMiddleware.isNotAuthenticated, usersController.create);
router.get('/users/:userId', authMiddleware.isAuthenticated, usersController.profile);
router.patch('/users/:userId', authMiddleware.isAuthenticated, usersController.update);
router.post('/users/:userId', authMiddleware.isAuthenticated, usersController.delete);

// Project routes
router.get('/projects/:userId', authMiddleware.isAuthenticated, projectsController.read);
router.post('/projects/:userId/new', authMiddleware.isAuthenticated, projectsController.create);
router.patch('/projects/:userId/:projectId', authMiddleware.isAuthenticated, projectsController.update);
router.delete('projects/:userId/:projectId', authMiddleware.isAuthenticated, projectsController.delete);

// Log routes
// router.get('/projects/:projectid', authMiddleware.isAuthenticated, logsController.read);
// router.post('/projects/:projectid/new', authMiddleware.isAuthenticated, logsController.create);
// router.patch('/projects/:projectid/:logid', authMiddleware.isAuthenticated, logsController.update);
// router.delete('/projects/:projectid/:logid', authMiddleware.isAuthenticated, logsController.delete);  

module.exports = router;