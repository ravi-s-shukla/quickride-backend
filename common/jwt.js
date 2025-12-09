import jwt from "jsonwebtoken";

export function generateToken(user) {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };
  const token = jwt.sign(payload, "your-secret-key", {
    expiresIn: "7d",
  });
  return token;
};

export function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, "your-secret-key");
    return decoded;
  } catch (error) {
    return null;
  }
};