const {Router} = require('express');
const { registerController, loginController } = require('../controllers/auth.controller');

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

module.exports = authRouter;