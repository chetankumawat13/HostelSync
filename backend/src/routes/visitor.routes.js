const { Router } = require('express');
const { createVisitorRequestController,
    getMyVisitorRequestsController,
    getAllVisitorRequestsController,
    approvedVisitorRequestController,
    checkInVisitorController,
    checkOutVisitorController} = require('../controllers/visitor.controller');
const adminMiddleware = require('../middleware/admin.middleware');
const authMiddleware = require('../middleware/auth.middleware');

const visitorRouter = Router();

/****
 *  
 * * @post /api/visitors
 * * @desc Create a new visitor request
 * * * @access Private
 * */

visitorRouter.post('/',authMiddleware,createVisitorRequestController)

/**
 * * @get /api/visitors
 * * @desc Get all visitor requests
 * * * @access Private/Admin
 * */

visitorRouter.get('/my',authMiddleware,getMyVisitorRequestsController)


/**
 * * * @get /api/visitors
 * * @desc Get all visitor requests
 * * * @access Private/Admin
 * */

visitorRouter.get('/',authMiddleware,adminMiddleware,getAllVisitorRequestsController)


/**
 *  * * @put /api/visitors/:id/approve
 * * * @desc Approve a visitor request
 * * * @access Private/Admin
 * */

visitorRouter.put('/:id/approve',authMiddleware,adminMiddleware,approvedVisitorRequestController)

/**
 * * * @put /api/visitors/:id/checkIn
 * * * @desc Check in a visitor
 * * * @access Private/Admin
 * */

visitorRouter.put('/:id/checkIn',authMiddleware,adminMiddleware,checkInVisitorController)

/**
 *  * * @put /api/visitors/:id/checkOut
 * * * @desc Check out a visitor
 * * * @access Private/Admin
 * */

visitorRouter.put('/:id/checkOut',authMiddleware,adminMiddleware,checkOutVisitorController)



module.exports = visitorRouter;
