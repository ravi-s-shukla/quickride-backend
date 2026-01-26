import { asyncHandler } from "../../middleware/async-handler.js";
import RideService from "../services/route-service.js";
import FairService from "../services/fair-service.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";

class RideController {
    getRidesFair = asyncHandler(async (req, res) => {
        console.log("Request Body:", req.body);
        const {distance, duration} = req.body;
        const fare = await FairService.calculateFare(distance, duration);
        if(!fare) {
            return new ApiError(500, "Could not calculate fare");
        }
        return res.status(200).json(new ApiResponse(200, "Fare calculated successfully", { fare }));
    });

    getRouteInformation = asyncHandler(async (req, res) => {
        const {pickup, dropoff} = req.body;
        const routeInfo = await RideService.routeInformation(pickup.lat, pickup.lng, dropoff.lat, dropoff.lng);

        if(!routeInfo) {
            return new ApiError(500, "Could not fetch route information");
        }
        
        return res.status(200).json(new ApiResponse(200, "Route information fetched successfully", routeInfo));
    });
}

export default new RideController();