//@desc   GET all bootcamps
//@route  GET /api/v1/bootcamps
//@access Public
exports.getBootcamps = (req,res,next)=>{
    res.status(200).json({success: true, msg: 'Show all bootcamps'})
}

//@desc   GET single bootcamp
//@route  GET /api/v1/bootcamps/:id
//@access Public
exports.getBootcamp = (req,res,next)=>{
    res.status(200).json({success: true, msg: `Get bootcamp ${req.params.id}`})
}

//@desc   CREATE bootcamp
//@route  POST /api/v1/bootcamps
//@access Private
exports.createBootcamp = (req,res,next)=>{
    res.status(200).json({success: true, msg: 'Create new bootcamp'})
}

//@desc   Update bootcamp
//@route  PUT /api/v1/bootcamps/:id
//@access Private
exports.updateBootcamp = (req,res,next)=>{
    res.status(200).json({success: true, msg: `Update bootcamp ${req.params.id}`})
}

//@desc   Delete bootcamp
//@route  Delete /api/v1/bootcamps/:id
//@access Private
exports.deleteBootcamp = (req,res,next)=>{
    res.status(200).json({success: true, msg: `delete bootcamp ${req.params.id}`})
}