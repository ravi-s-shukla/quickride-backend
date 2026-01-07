import ApiError from "../utils/ApiError.js";

export const errorHandler = (err, req, res, next) => {
    console.log(err);

    if(err instanceof ApiError) {
        res.status(err.status).json({ success: false, message: err.message });
    }

    res.status(500).json({ success: false, message: "Internal Server Error" });
}
