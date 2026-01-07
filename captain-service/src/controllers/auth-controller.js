import { asyncHandler } from "../../middleware/async-handler.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import authService from "../services/auth-service.js";

class AuthController {
  signUp = asyncHandler(async (req, res) => {
    const captain = await authService.createCaptain(req);
    if (!captain) throw new ApiError(500, "Captain not created");
    return res
      .status(201)
      .json(new ApiResponse(201, "Captain created successfully"));
  });

  login = asyncHandler(async (req, res) => {
    const captain = await authService.login({
      email: req.body.email,
      password: req.body.password,
    });
    if (!captain) throw new ApiError(500, "Captain not logged in");
    res.cookie("token", captain.token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.cookie("role", "captain", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 24 * 60 * 60 * 1000,
    });
    const captainDetails = {
      name: captain.name,
      email: captain.email,
      phone: captain.phone,
      id: captain._id,
      vehicle: {
        model: captain.vehicle.model,
        plateNumber: captain.vehicle.plateNumber,
      },
    };
    return res
      .status(200)
      .json(
        new ApiResponse(200, "Captain logged in successfully", captainDetails)
      );
  });

  logout = asyncHandler(async (req, res) => {
    res.cookie("token", "", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.cookie("role", "", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res
      .status(200)
      .json(new ApiResponse(200, "Captain logged out successfully"));
  });

  details =  asyncHandler(async (req, res) => {
    const { id } = req.user;
    const captain = await authService.captainDetails({ id });
    return res.status(200)
      .json(new ApiResponse(200, "Captain details", captain));
  });
}

export default new AuthController();
