const {Router} = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const adminMiddleware = require('../middleware/admin.middleware');
const { createRoomController, getAllRoomsController } = require('../controllers/room.controller');

const roomRouter = Router();

/**
 * @post /api/rooms
 * @desc Create a new room
 * @access Private/Admin
 */

roomRouter.post('/',authMiddleware,adminMiddleware,createRoomController)


/**
 * @get /api/rooms
 * @desc Get all rooms
 * @access Private/Admin
 */

roomRouter.get('/',authMiddleware,adminMiddleware,getAllRoomsController)


module.exports = roomRouter;

