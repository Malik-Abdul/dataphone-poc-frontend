import { API, api, ApiResponse } from "@/lib/api";
import { BaseService } from "@/services/base.service";
import { User, CreateUserDto, UpdateUserDto } from "@/types/user";
import { UsersResponse } from "@/types/user";

class UsersService extends BaseService<User, CreateUserDto, UpdateUserDto> {
  constructor() {
    super(API.users.list);
  }

  getUsers(): Promise<ApiResponse<UsersResponse>> {
    // return api.get<User[]>(API.users.list);
    return api.get<UsersResponse>(API.users.list);
  }
}

export const usersService = new UsersService();

export default usersService;
