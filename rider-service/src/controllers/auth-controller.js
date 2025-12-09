import authService from "#src/services/auth-service.js";

class AuthController {
    async signUp(req, res) {
        try {
            const rider =  await authService.createUser(req);
            res.status(201).json({ status: 201, message: "Rider created successfully"});
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async login(req, res) {
        try {
            const rider = await authService.login(req);    
            res.cookie("token", rider.token, { httpOnly: true, secure: false, sameSite: 'lax', path: '/', maxAge: 24 * 60 * 60 * 1000 }); 
            res.cookie("role", "rider", { httpOnly: true, secure: false, sameSite: 'lax', path: '/', maxAge: 24 * 60 * 60 * 1000 });
            rider.token = undefined;                        
            res.status(200).json({ status: 200, data: rider });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async logout(req, res) {
        try {
            //delete token from db
            const { email } = req.body;
            const deletedUser = await userModel.findOneAndDelete({ email });
            if (!deletedUser) {
                return res.status(404).json({ error: "Rider not found" });
            }
            res.status(200).json({ message: "Logged out successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default new AuthController();