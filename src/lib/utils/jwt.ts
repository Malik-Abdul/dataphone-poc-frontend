import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

/**
 * Generate JWT token
 */

export function generateToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d",
  });
}
/**
 * Verify JWT token
 */
export function verifyToken(token: string): string | JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.log("JWT verification failed:", error);
    return null;
  }
}

/**
 * Decode token without verification
 * (optional helper)
 */
export function decodeToken(token: string) {
  return jwt.decode(token);
}
