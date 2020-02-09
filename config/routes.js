const express         = require('express');
const router          = express.Router();
const authMiddleware  = require('../middlewares/auth.middleware');
const usersController = require('../controllers/users.controller');

// Access routes
router.post('/login', authMiddleware.isNotAuthenticated, usersController.doLogin);
router.post('/logout', authMiddleware.isAuthenticated, usersController.logout);

// User routes
router.post('/users', authMiddleware.isNotAuthenticated, usersController.create);
router.get('/users/:username', authMiddleware.isAuthenticated, usersController.profile);
router.patch('/users/:username', authMiddleware.isAuthenticated, usersController.update);
router.delete('/users/:username', authMiddleware.isAuthenticated, usersController.delete);

// Project routes
router.get('/projects/:username', authMiddleware.isAuthenticated, projectsController.index);
router.post('/projects/:username/new', authMiddleware.isAuthenticated, projectsController.create);
router.patch('/projects/:username/:projectid', authMiddleware.isAuthenticated, projectsController.update);
router.delete('projects/:username/:projectid', authMiddleware.isAuthenticated, projectsController.delete);

// Log routes
router.get('/projects/:projectid', authMiddleware.isAuthenticated, logController.index);
router.post('/projects/:projectid/new', authMiddleware.isAuthenticated, logController.create);
router.patch('/projects/:projectid/:logid', authMiddleware.isAuthenticated, logController.update);
router.delete('/projects/:projectid/:logid', authMiddleware.isAuthenticated, logController.delete);  

module.exports = router;