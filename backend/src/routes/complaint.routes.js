const {Router} = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const { createComplaintController,
    getMyComplaintsController,
    getAllComplaintsController,
    updateComplaintStatusController,
    assignComplaintsController } = require('../controllers/complaint.controller');
const adminMiddleware = require('../middleware/admin.middleware');

const complaintRouter = Router();


/**
 * @post /api/complaints
 * @desc Create a new complaint
 * @access Private
 */
complaintRouter.post('/',authMiddleware,createComplaintController)


/**
 * @get /api/complaints
 * @desc Get all complaints
 * @access Private/Admin
 */

complaintRouter.get('/my',authMiddleware,getMyComplaintsController)


/**
 * @get /api/complaints
 * @desc Get all complaints
 * @access Private/Admin
 */

complaintRouter.get('/',authMiddleware,adminMiddleware,getAllComplaintsController)

/**
 * @put /api/complaints/:id/status
 * @desc Resolve a complaint
 * @access Private/Admin
 */
complaintRouter.put('/:id/status',authMiddleware,adminMiddleware,updateComplaintStatusController)


/**
 * @put /api/complaints/:id/assign
 * @desc Assign a complaint to a staff member
 * @access Private/Admin
 */

complaintRouter.put('/:id/assign',authMiddleware,adminMiddleware,assignComplaintsController)


module.exports = complaintRouter;