import AuthService from '../services/auth-service.js';

class AuthController {
    async signUp(req, res) {
        try {
            const captain =  await AuthService.createCaptain(req);
            res.status(201).json({ status: 201, message: "Captain created successfully"});
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async login(req, res) {
        try {
            const captain = await AuthService.login(req);    
            res.cookie("token", captain.token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: 'lax', path: '/', maxage: 24 * 60 * 60 * 1000 }); 
            res.cookie("role", "captain", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: 'lax', path: '/', maxage: 24 * 60 * 60 * 1000 });
            captain.token = undefined;                         
            res.status(200).json({ status: 200, data: captain });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async logout(req, res) {
        try {
            //delete token from db
            const { email } = req.body;
            const deletedCaptain = await captainModel.findOneAndDelete({ email });
            if (!deletedCaptain) {
                return res.status(404).json({ error: "Captain not found" });
            }
            res.status(200).json({ message: "Logged out successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default new AuthController();