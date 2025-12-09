import captainModel from '#db/captain-model.js';
import { hashPassword, comparePassword } from "#common/bcrypt.js";
import { generateToken } from "#common/jwt.js";

class AuthService {
    async createCaptain(req) {
        try {
            const { email, phone } = req.body;
            const existingCaptain = await captainModel.findOne({ email, phone});
            if (existingCaptain) {
                return "Captain already exists";
            }
            const hashedPassword = await hashPassword(req.body.password);
            req.body.password = hashedPassword;
            const captain = await captainModel.create(req.body);
            captain.password = undefined;
            return captain;
        } catch (error) {
            throw error;
        }
    }

    async login(req) {
        const { email, password } = req.body;
        const captain = await captainModel.findOne({ email }).select("+password");
        if (!captain) {
            throw new Error("Captain not found");
        }
        const isPasswordValid = await comparePassword(password, captain.password);
        if (!isPasswordValid) {
            throw new Error("Invalid password");
        }
        captain.status = "available";
        const token = generateToken(captain);
        captain.token = token;
        captain.password = undefined;
        return captain;
    }
}

export default new AuthService();