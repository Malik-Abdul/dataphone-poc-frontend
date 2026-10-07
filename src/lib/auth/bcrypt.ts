import bcrypt from "bcryptjs";

/**
 * Number of salt rounds
 * Higher = more secure but slower
 */
const SALT_ROUNDS = 10;

/**
 * Hash a plain password
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Compare plain password with hashed password
 */
export async function comparePassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

/**
 * Generate salt manually (optional)
 */
export async function generateSalt(): Promise<string> {
  return bcrypt.genSalt(SALT_ROUNDS);
}

/**
 * Hash password using custom salt
 */
export async function hashWithSalt(
  password: string,
  salt: string
): Promise<string> {
  return bcrypt.hash(password, salt);
}
