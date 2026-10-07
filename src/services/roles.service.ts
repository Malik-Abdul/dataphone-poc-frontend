import {
  CreateRoleDto,
  Role,
  RolesResponse,
  UpdateRoleDto,
} from "@/types/role";
import { BaseService } from "./base.service";
import api, { API, ApiResponse } from "@/lib/api";

class RolesService extends BaseService<Role, CreateRoleDto, UpdateRoleDto> {
  constructor() {
    super(API.roles.list);
  }
  getRoles(): Promise<ApiResponse<RolesResponse>> {
    return api.get<RolesResponse>(API.roles.list);
  }
}

export const rolesService = new RolesService();
