const userModel = require("../models/user.model")

/**
 * @desc Middleware to check if the user is an admin
 * @access Private
 */

async function adminMiddleware(req,res,next){
    const userId = req.user.id
    const role = await userModel.findById(userId)
    if(role.role !== 'admin'){
        return res.status(403).json({
            message:'Forbidden'
        })
    }
    next()
}


module.exports = adminMiddleware