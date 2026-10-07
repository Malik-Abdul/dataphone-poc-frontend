import { api, API } from "@/lib/api";
import { ApiResponse } from "@/lib/api";

/**
 * Replace these interfaces with your generated DTOs later.
 */

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
}

export interface ForgotPasswordDto {
  email: string;
}

export interface ResetPasswordDto {
  token: string;
  password: string;
}

/**
 * Replace this with your User interface.
 */
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

class AuthService {
  /**
   * Login
   *
   * Backend sets HTTP-only cookies.
   */
  login(dto: LoginDto): Promise<ApiResponse<User>> {
    return api.post<User, LoginDto>(API.auth.login, dto);
  }

  /**
   * Logout
   *
   * Backend clears cookies.
   */
  logout(): Promise<ApiResponse<null>> {
    return api.post<null>(API.auth.logout);
  }

  /**
   * Refresh Token
   *
   * Normally called automatically
   * by the interceptor.
   */
  refresh(): Promise<ApiResponse<null>> {
    return api.post<null>(API.auth.refresh);
  }

  /**
   * Current logged-in user
   */
  me(): Promise<ApiResponse<User>> {
    return api.get<User>(API.auth.me);
  }

  /**
   * Register
   */
  register(dto: RegisterDto): Promise<ApiResponse<User>> {
    return api.post<User, RegisterDto>(API.auth.register, dto);
  }

  /**
   * Forgot Password
   */
  forgotPassword(dto: ForgotPasswordDto): Promise<ApiResponse<null>> {
    return api.post<null, ForgotPasswordDto>(API.auth.forgotPassword, dto);
  }

  /**
   * Reset Password
   */
  resetPassword(dto: ResetPasswordDto): Promise<ApiResponse<null>> {
    return api.post<null, ResetPasswordDto>(API.auth.resetPassword, dto);
  }

  /**
   * Change Password
   */
  changePassword(dto: ChangePasswordDto): Promise<ApiResponse<null>> {
    return api.patch<null, ChangePasswordDto>(API.auth.changePassword, dto);
  }
}

export const authService = new AuthService();

export default authService;
