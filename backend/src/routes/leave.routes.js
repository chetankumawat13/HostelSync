const {Router} = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const { createLeaveController,getMyLeavesController,getAllLeavesController,approveLeaveController,rejectLeaveController  } = require('../controllers/leave.controller');
const adminMiddleware = require('../middleware/admin.middleware');

const leaveRouter = Router();

/**
 * @post /api/leaves
 * @desc Create a new leave request
 * @access Private
 */
leaveRouter.post('/',authMiddleware,createLeaveController)

/**
 * @get /api/leaves
 * @desc Get all leave requests
 * @access Private/Admin
 */

leaveRouter.get('/my',authMiddleware,getMyLeavesController)


/**
 * @get /api/leaves
 * @desc Get all leave requests
 * @access Private/Admin
 */

leaveRouter.get('/',authMiddleware,adminMiddleware,getAllLeavesController)

/**
 * @put /api/leaves/:id/approve
 * @desc Approve a leave request
 * @access Private/Admin
 */

leaveRouter.put('/:id/approve',authMiddleware,adminMiddleware,approveLeaveController)


/**
 *  @put /api/leaves/:id/reject
 * @desc Reject a leave request
 * @access Private/Admin
 */

leaveRouter.put('/:id/reject',authMiddleware,adminMiddleware,rejectLeaveController)

module.exports = leaveRouter;






