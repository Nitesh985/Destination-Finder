import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { User } from '../model/user.model.js'
import { uploadToCloudinary } from '../utils/cloudinary.js'

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
    
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
    
        user.refreshToken = refreshToken
        await user.save({validateBeforeSave:false})
    
        return {accessToken, refreshToken}
    } catch (error) {
        throw new ApiError(error?.statusCode | 500, error?.message | "There occured some error while generating access and refresh token")
    }
}


const registerUser = asyncHandler(async (req, res)=> {
    const {username, password, email} = req.body

    const reqFields = ["username", "password", "email"]

    reqFields.forEach(field=>{
        if (!req.body[field]){
            throw new ApiError(401, `${field[0].toUpperCase() + field.slice(1)} is a required field`)
        }
    })

    const userExists = await User.findOne({
        $or:[{username}, {email}]
    })

    if (userExists){
        throw new ApiError(401, "The user by that username or email already exists")
    }

    const avatarFile = req.file

    if (!avatarFile){
        throw new ApiError(401, "The avatar file is not found")
    }

    const avatar = await uploadToCloudinary(avatarFile)

    if (!avatar){
        throw new ApiError(501, "Something went wrong uploading the image")
    }

    const user = await User.create({
        username,
        email:email.toLowerCase(),
        password,
        avatar
    })

    if (!user){
        throw new ApiError(501, "Something went wrong saving the user, please try again later")
    }

    const findUser = await User.findById(user._id).select("-password -refreshToken")

    if (!findUser){
        throw new ApiError(501, "Some Error occured while registering the user")
    }


    return res.status(202)
    .json(
        new ApiResponse(202, "The user is registered successfully!", findUser)
    )
})


const loginUser = asyncHandler(async (req, res)=>{
    const {username, email, password} = req.body

    if ((!username & !email) | !password ) {
        throw new ApiError(401, "The required fields are not given")
    }

    const user = await User.findOne({
        $or:[{username}, {email}]
    })

    if (!user){
        throw new ApiError(404, "The user by that email or username doesn't exists!")
    }

    const isPasswordCorrect = await user.verifyPassword(password)

    if (!isPasswordCorrect){
        throw new ApiError(401, "The password given is incorrect!")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

    const options = {
        httpOnly:true,
        secure:true
    }

    return res.status(200)
    .cookie("AccessToken", accessToken, options)
    .cookie("RefreshToken", refreshToken, options)
    .json(
        new ApiResponse(200, "The user is logged in successfully")
    )
})


const logoutUser = asyncHandler(async (req, res)=>{
    const user = req.user
    
    const findUser = await User.findByIdAndUpdate()
})


export { registerUser, loginUser }