const {Router} = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const adminMiddleware = require('../middleware/admin.middleware');
const { getAllStudentController, getStudentByIdController, updateStudentController, getAssignedRoomController } = require('../controllers/student.controller');

const studentRouter = Router();


/**
 * @get /api/students
 * @desc Get all students
 * @access Private/Admin
 */

studentRouter.get('/',authMiddleware,adminMiddleware,getAllStudentController)


/**
 * @get /api/students/:id
 * @desc Get a student by id
 * @access Private/Admin
 */
studentRouter.get('/:id',authMiddleware,getStudentByIdController)


/**
 * @put /api/students/:id
 * @desc Update a student by id
 * @access Private/Admin
 */

studentRouter.put('/:id',authMiddleware,updateStudentController)

/**
 * @get /api/students/:id/room
 * @desc Get the assigned room of a student
 * @access Private
 */

studentRouter.get('/:id/room',authMiddleware,getAssignedRoomController)




module.exports = studentRouter;


