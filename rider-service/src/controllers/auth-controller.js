import authService from "#src/services/auth-service.js";
import { asyncHandler } from "../../middleware/async-handler.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";

class AuthController {
  signUp = asyncHandler(async (req, res) => {
    const rider = await authService.createRider(req);
    if (!rider) throw new ApiError(500, "Rider not created");
    return res
      .status(201)
      .json(new ApiResponse(201, "Rider created successfully"));
  });

  login = asyncHandler(async (req, res) => {
    const rider = await authService.login({
      email: req.body.email,
      password: req.body.password,
    });
    if (!rider) throw new ApiError(500, "Rider not logged in");
    res.cookie("token", rider.token, {
      httpOnly: true,                        
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 24 * 60 * 60 * 1000,                               
    });
    res.cookie("role", "rider", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 24 * 60 * 60 * 1000,
    });
    const riderDetails = {
      name: rider.name,
      email: rider.email,
      phone: rider.phone,
      id: rider._id,
    };
    return res
      .status(200)
      .json(new ApiResponse(200, "Rider logged in successfully", riderDetails));
  });

  logout = asyncHandler(async (req, res) => {
    res.cookie("token", "", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });
    res.cookie("role", "", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });
    return res
      .status(200)
      .json(new ApiResponse(200, "Rider logged out successfully"));
  });

  details = asyncHandler(async (req, res) => {
    const rider = await authService.riderDetails(req.user.id);
    return res.status(200)
      .json(new ApiResponse(200, "Rider details fetched successfully", rider));
  });
}

export default new AuthController();
