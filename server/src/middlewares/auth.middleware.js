import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from '../model/user.model.js'
import jwt from 'jsonwebtoken'


export const verifyUser = asyncHandler(async (req, res, next)=>{
    const accessToken = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

    if (!accessToken){
        throw new ApiError(403, "Access Token Not Found")
    }    

    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, function (err){
        if (err){
            throw new ApiError(403, err.message)
        }
    })

    const user = await User.findById(decoded._id)
    req.user = user

    next()
})