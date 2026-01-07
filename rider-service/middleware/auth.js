import { verifyToken } from "#common/jwt.js";

export const auth = async(req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const decoded = verifyToken(token);
    if(!decoded) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    req.user = decoded;
    next();
}