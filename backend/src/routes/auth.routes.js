const {Router} = require('express');
const { registerController, loginController, getMeController, logOutController } = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');

const authRouter = Router();

/**
 * @get /api/auth/register
 * @desc Register a new user 
 * @access Public
 */

authRouter.post('/register',registerController)

/**
 * @get /api/auth/login
 * @desc Login a user
 * @access Public
 */


authRouter.post('/login',loginController)

/**
 * @get /api/auth/me
 * @desc Get the current logged in user
 * @access Private
 *
 */

authRouter.get('/me', authMiddleware, getMeController)


authRouter.post('/logout',authMiddleware,logOutController)


module.exports = authRouter;