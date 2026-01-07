import captainModel from "#db/captain-model.js";
import { hashPassword, comparePassword } from "#common/bcrypt.js";
import { generateToken } from "#common/jwt.js";
import ApiError from "../../utils/ApiError.js";

class AuthService {
  async createCaptain(req) {
    const { email, phone } = req.body;
    const existingCaptain = await captainModel.findOne({ email, phone });
    if (existingCaptain) {
      throw new ApiError(409, "Captain already exists"); // 409 is for conflict like if user already exist
    }
    const hashedPassword = await hashPassword(req.body.password);
    req.body.password = hashedPassword;
    const captain = await captainModel.create(req.body);
    captain.password = undefined;
    return captain;
  }

  async login({ email, password }) {
    const captain = await captainModel.findOne({ email }).select("+password");
    if (!captain) throw new ApiError(404, "Captain not found"); // not found resource

    const isPasswordValid = await comparePassword(password, captain.password);
    if (!isPasswordValid) throw new ApiError(401, "Invalid password"); // unauthorized because not successfully authenticated
    captain.role = "captain";
    const token = generateToken(captain);
    const captainObj = captain.toObject();
    delete captainObj.password;
    captainObj.token = token;
    return captainObj;
  }

  async captainDetails({id}) {
    const captain = await captainModel.findById(id);
    if (!captain) throw new ApiError(404, "Captain not found");
    return captain.toObject();
  }
}

export default new AuthService();
