const User = require('../models/User')
const ErrorResponse = require('../utils/errorResponse.js')
const asyncHandler = require('../middleware/async')

//@desc   Get all users
//@route  GET /api/v1/auth/users
//@access Private/Admin
exports.getUsers = asyncHandler(async (req,res,next)=>{
  res.status(200).json(res.advancedResults)
})

//@desc   Get single user
//@route  GET /api/v1/auth/users/:id
//@access Private/Admin
exports.getUser = asyncHandler(async (req,res,next)=>{
   const user = await User.findByIdAndUpdate(req.params.id)

   res.status(200).json({
       success: true,
       data: user
   })
})

//@desc   Register user
//@route  POST /api/v1/auth/register
//@access Public
exports.createUser = asyncHandler(async (req,res,next)=>{
   const user = await User.create(req.body)

   //create a resource so send a 201
   res.status(201).json({
       success: true,
       data: user
   })
})

//@desc   Update user
//@route  PUT /api/v1/auth/:id
//@access Private/Admin
exports.updateUser = asyncHandler(async (req,res,next)=>{
    const user = await User.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
        runValidators:true
    })

    res.status(200).json({
        success:true,
        data:user
    })

})

//@desc   Delete user
//@route  DELETE /api/v1/auth/delete
//@access Private
exports.deleteUser = asyncHandler(async (req,res,next)=>{
    await User.findByIdAndDelete(req.params.id)

    res.status(200).json({
        success: true,
        data: {}
    })
})




