import {v2 as cloudinary} from 'cloudinary';
import { ApiError } from './ApiError.js'



cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_API_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadToCloudinary = async (file) => {
    try {
        const uploadResult = await cloudinary.uploader.upload("https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg", {
            public_id: "shoes"
        })
        return {
            url:uploadResult.url,
            public_id:uploadResult.public_id
        }
    } catch (error) {
        throw new ApiError(error?.statusCode | 501, error?.message | "Error while uploading to the cloudinary")
    }
}

const deleteFromCloudinary = async (file) => {
    try {
        await cloudinary.uploader.destroy(file.public_id)
    } catch (error) {
        throw new ApiError( error?.statusCode | 501, error?.message | "Error while deleting file on cloudinary")
    }
}


export { uploadToCloudinary, deleteFromCloudinary }




