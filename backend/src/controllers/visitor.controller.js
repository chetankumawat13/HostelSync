const studentModel = require('../models/student.model')
const visitorModel = require('../models/visitor.model')


async function createVisitorRequestController(req,res){
    const {name,phone,visitDate,reason} = req.body

    const student = await studentModel.findOne({userId:req.user.id})

    if(!student){
        return res.status(404).json({
            message:'Student not found'
        })
    }

    const visitorRequest = await visitorModel.create({
        student:student._id,
        name,
        phone,
        visitDate,
        reason,
        status:'pending'
    })

    res.status(201).json({
        message:'Visitor request created successfully',
        visitorRequest
    })
}


async function getMyVisitorRequestsController(req,res){
    const student = await studentModel.findOne({userId:req.user.id})

    if(!student){
        return res.status(404).json({
            message:'Student not found'
        })
    }

    const visitorRequests = await visitorModel.find({student:student._id}).sort({createdAt:-1})

    res.status(200).json({
        message:'Visitor requests fetched successfully',
        visitorRequests
    })
}


async function getAllVisitorRequestsController(req,res){
    const visitorRequests = await visitorModel.find().populate('student','rollNumber course year').sort({createdAt:-1})

    res.status(200).json({
        message:'Visitor requests fetched successfully',
        visitorRequests
    })
}


async function approvedVisitorRequestController(req,res){
    const id = req.params.id
    const visitorRequest = await visitorModel.findById(id)

    if(!visitorRequest){
        return res.status(404).json({
            message:'Visitor request not found'
        })
    }

    if(visitorRequest.status !== 'pending'){
        return res.status(400).json({
            message:'Only pending requests can be approved'
        })
    }



    visitorRequest.status = 'approved'
    visitorRequest.approvedBy = req.user.id

    visitorRequest.gatePassCode = Math.random().toString(36).substring(2,8).toUpperCase()

    await visitorRequest.save()



    res.status(200).json({
        message:'Visitor request approved successfully',
        gatePassCode:visitorRequest.gatePassCode,
        visitorRequest
    })
}



async function checkInVisitorController(req,res){
    const {gatePassCode} = req.body

    const visitorRequest = await visitorModel.findOne({gatePassCode})

    if(!visitorRequest){
        return res.status(404).json({
            message:'Invalid gate pass code'
        })
    }

    if(visitorRequest.status !== 'approved'){
        return res.status(400).json({
            message:'Only approved requests can check in'
        })
    }

    visitorRequest.status = 'checked-in'
    await visitorRequest.save()

    res.status(200).json({
        message:'Visitor checked in successfully',
        visitorRequest
    })
}


async function checkOutVisitorController(req,res){
    const {gatePassCode} = req.body

    const visitorRequest = await visitorModel.findOne({gatePassCode})

    if(!visitorRequest){
        return res.status(404).json({
            message:'Invalid gate pass code'
        })
    }

    if(visitorRequest.status !== 'checked-in'){
        return res.status(400).json({
            message:'Only checked-in visitors can check out'
        })
    }

    visitorRequest.status = 'checked-out'
    await visitorRequest.save()

    res.status(200).json({
        message:'Visitor checked out successfully',
        visitorRequest
    })
}



module.exports = {
    createVisitorRequestController,
    getMyVisitorRequestsController,
    getAllVisitorRequestsController,
    approvedVisitorRequestController,
    checkInVisitorController,
    checkOutVisitorController
}