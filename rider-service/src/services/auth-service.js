import { hashPassword, comparePassword } from "#common/bcrypt.js";
import { generateToken } from "#common/jwt.js";
import riderModel from "#db/rider-model.js";
import ApiError from "../../utils/ApiError.js";

class AuthService {
  async createRider(req) {
    const { email, phone } = req.body;
    const existingRider = await riderModel.findOne({ email, phone });
    if (existingRider) {
      throw new ApiError(409, "Rider already exists"); // 409 is for conflict like if user already exist
    }
    const hashedPassword = await hashPassword(req.body.password);
    req.body.password = hashedPassword;
    const rider = await riderModel.create(req.body);
    rider.password = undefined;
    return rider;
  }

  async login({ email, password }) {
    const rider = await riderModel.findOne({ email }).select("+password");
    if (!rider) throw new ApiError(404, "Rider not found"); // not found resource

    const isPasswordValid = await comparePassword(password, rider.password);
    if (!isPasswordValid) throw new ApiError(401, "Invalid password"); // unauthorized because not successfully authenticated
    rider.role = "rider";
    const token = generateToken(rider);
    const riderObj = rider.toObject();
    delete riderObj.password;
    riderObj.token = token;
    return riderObj;
  }

  async riderDetails(id) {
    const rider = await riderModel.findById(id);
    if (!rider) throw new ApiError(404, "Rider not found");
    return rider;
  }
}

export default new AuthService();
