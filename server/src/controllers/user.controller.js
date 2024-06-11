import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { User } from '../model/user.model.js'
import { uploadToCloudinary } from '../utils/cloudinary.js'
import jwt from 'jsonwebtoken'


const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
    
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
    
        user.refreshToken = refreshToken
        await user.save({validateBeforeSave:false})
    
        return {accessToken, refreshToken}
    } catch (error) {
        throw new ApiError(error?.statusCode || 500, error?.message || "There occured some error while generating access and refresh token")
    }
}

const testResponse = asyncHandler(async (req, res)=> {
    const hello = false
    if (!hello){
        throw new ApiError(401, "The hello is not set true")
    }
    return res.status(200)
    .json(
        new ApiResponse(200, "The hello is true")
    )
})


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
        throw new ApiError(400, "The user by that username or email already exists")
    }

    const avatarFile = req.file?.path



    const avatar = avatarFile?await uploadToCloudinary(avatarFile):null

    if (avatarFile & !avatar){
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
        throw new ApiError(400, "The required fields are not given")
    }

    const user = await User.findOne({
        $or:[{username}, {email}]
    })


    if (!user){
        throw new ApiError(401, "The user by that email or username doesn't exists!")
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
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(200, "The user is logged in successfully")
    )
})


const logoutUser = asyncHandler(async (req, res)=>{
    const user = req.user
    
    const userData = await User.findByIdAndUpdate(user?._id, {
        $set:{
            refreshToken:null
        }
    })

    if (!userData){
        throw new ApiError(401, "The user's data was not found to logout")
    }

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
    .cookie("accessToken", null, options)
    .cookie("refreshToken", null, options)
    .json(
        new ApiResponse(200, "The user logged out successfully!")
    )
})


const refreshAccessToken = asyncHandler(async (req, res)=>  {
    const prevRefreshToken = req.cookies?.refreshToken || req.header("Authorization").replace("Bearer ", "")

    if (!prevRefreshToken){
        throw new ApiError(403, "Refresh Token Not Found!")
    }

    
    const decoded = jwt.verify(prevRefreshToken, process.env.REFRESH_TOKEN_SECRET)


    const user = await User.findById(decoded?._id)

    if (!user){
        throw new ApiError(404, "The user was not found!") 
    }

    if (user.refreshToken !== prevRefreshToken){
        throw new ApiError(401, "The refresh token is not valid!")
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id)

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(202)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(202, "The access token was refreshed successfully!")
    )

})


export { registerUser, loginUser, logoutUser, refreshAccessToken, testResponse }