const {Router} = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const adminMiddleware = require('../middleware/admin.middleware');
const { createRoomController, getAllRoomsController, assignStudentToRoom, removeStudentFromRoom, updateRoomController } = require('../controllers/room.controller');

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


/**
 * @put /api/rooms/:id/assign
 * @desc Assign a student to a room
 * @access Private/Admin
 */

roomRouter.put('/:id/assign',authMiddleware,adminMiddleware,assignStudentToRoom)


/**
 * @put /api/rooms/:id/remove
 * @desc Remove a student from a room
 * @access Private/Admin
 */

roomRouter.put('/:id/remove',authMiddleware,adminMiddleware,removeStudentFromRoom)



roomRouter.put('/:id',authMiddleware,adminMiddleware,updateRoomController)

module.exports = roomRouter;

