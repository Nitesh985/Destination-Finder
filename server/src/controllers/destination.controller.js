import mongoose from 'mongoose'
import { ApiResponse } from '../utils/ApiResponse.js'
import { ApiError } from '../utils/ApiError.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { Category } from '../model/category.model.js'
import { Destination } from '../model/destination.model.js'



const createDestination = asyncHandler(async (req, res)=> {
    const { name, description, category, location } = req.body

    const destinationCategory = await Category.find({
        name:category
    })

    if (!destinationCategory){
        throw new ApiError(404, "The category was not found!")
    }

    const destinationLocation = await Location.find({
        name: location
    })

    if (!destinationLocation){
        throw new ApiError(404, "The description specified was not found")
    }

    const destination = await Destination.create({
        name,
        description,
        locationId:destinationLocation._id,
        categoryId: destinationCategory._id
    })

    if (!destination){
        throw new ApiResponse(501, "There was an error, saving the destination details")
    }

    return res.status(200)
    .json(
        new ApiResponse(200, "The destination was created successfully!")
    )

})


const getAllDestinations = asyncHandler(async (req, res)=> {
    const destinations = await Destination.find({})

    if (!destinations){
        throw new ApiError(501, "Error fetching the destinations, please try again later")
    }

    return res.status(200)
    .json(
        new ApiResponse(200,
        "All the destinations fetched successfully",
        destinations)
    )
})

const getDestinationByCategory = asyncHandler(async(req, res)=>{
    const {categoryName} = req.params

    const categoryId = await Category.findOne({
        name:categoryName
    })

    if (!categoryId){
        throw new ApiError(404, `The category by the name ${categoryName} was not found!`)
    }
    
    const destinations = await Category.aggregate([
        {
            $match:{
                _id: new mongoose.Types.ObjectId(categoryId)
            }
        },
        {
            $lookup:{
                from:"destinations",
                localField:"_id",
                foreignField:"categoryId",
                as:"destinations",
                pipeline:[
                    {
                        $project:{
                            _id:1,
                            name:1,
                            description:1,
                            images:1
                        }
                    }
                    
                ]
            }
        },
    ])

    if (!destinations?.length){
        throw new ApiError(500, "Something went wrong fetching the destinations!")
    }

    return res.status(200)
    .json(
        new ApiResponse(200, "Destinations fetched successfully!", destinations[0]?.destinations)
    )
})


export { createDestination, getAllDestinations, getDestinationByCategory }