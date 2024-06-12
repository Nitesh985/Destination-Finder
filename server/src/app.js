import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'



const app = express()


app.use(cors({
    origin:process.env.CORS_ORIGIN
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))

app.use(cookieParser())


// routes
import userRouter from './routes/user.routes.js'
import destinationRouter from './routes/destination.routes.js'
import locationRouter from './routes/location.routes.js'
import categoryRouter from './routes/category.routes.js'


app.use("/api/v1/users/", userRouter)
app.use("/api/v1/destination/", destinationRouter)
app.use("/api/v1/location/", locationRouter)
app.use("/api/v1/category/", categoryRouter)



export default app