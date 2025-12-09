import { hashPassword, comparePassword } from "#common/bcrypt.js";
import { generateToken } from "#common/jwt.js";
import userModel from "#db/rider-model.js";

class AuthService {
    async createUser(req) {
        const { email, phone } = req.body;
        const existingUser = await userModel.findOne({ email, phone});
        if (existingUser) {
            return "Rider already exists";
        }
        const hashedPassword = await hashPassword(req.body.password);
        req.body.password = hashedPassword;
        const rider = await userModel.create(req.body);
        rider.password = undefined;
        return rider;
    }

    async login(req) {
        const { email, password } = req.body;
        const rider = await userModel.findOne({ email }).select("+password");
        if (!rider) {
            throw new Error("Rider not found");
        }
        const isPasswordValid = await comparePassword(password, rider.password);
        if (!isPasswordValid) {
            throw new Error("Invalid password");
        }
        const token = generateToken(rider);
        rider.token = token;
        rider.password = undefined;
        return rider;
    }
}

export default new AuthService();