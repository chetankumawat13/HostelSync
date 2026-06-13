const {Router} = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const adminMiddleware = require('../middleware/admin.middleware');
const { createRoomController } = require('../controllers/room.controller');

const roomRouter = Router();

/**
 * @post /api/rooms
 * @desc Create a new room
 * @access Private/Admin
 */

roomRouter.post('/',authMiddleware,adminMiddleware,createRoomController)


module.exports = roomRouter;