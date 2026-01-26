import ApiError from "../../utils/ApiError.js";

const VEHICLE_PRICING = {
    bike: { baseFare: 10, perKm: 8, perMin: 1, multiplier: 0.8 },
    auto: { baseFare: 15, perKm: 12, perMin: 1.5, multiplier: 1 },
    car:  { baseFare: 12, perKm: 15, perMin: 2, multiplier: 1.2 },
    suv:  { baseFare: 20, perKm: 20, perMin: 3, multiplier: 1.5 }
  };
  
class FairService {
    calculateFare(distance, duration) {
        if(!distance || !duration) {
            throw new ApiError(400, "Distance and Duration are required to calculate fare");
        }

        const fares = {};
        for(const vehical in VEHICLE_PRICING) {
            const pricing = VEHICLE_PRICING[vehical];
            const fare = pricing.baseFare + pricing.perKm * distance + pricing.perMin * duration;
            fares[vehical] = Math.round(fare * pricing.multiplier *100) / 100; //two decimal places
        }
        return fares;
    };
}

export default new FairService();