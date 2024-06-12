import { Router } from "express";
import { createDestination, getAllDestinations, getDestinationByCategory } from "../controllers/destination.controller.js";


const router = Router()


router.route("/create-destination")
.post(createDestination)

router.route("/get-all-destinations")
.get(getAllDestinations)

router.route('/get-destination/c/:categoryName')
.get(getDestinationByCategory)


export default router