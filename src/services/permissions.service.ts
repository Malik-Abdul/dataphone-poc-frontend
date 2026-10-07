import {
  CreatePermissionDto,
  Permission,
  UpdatePermissionDto,
} from "@/types/permission";
import { BaseService } from "./base.service";
import { API } from "@/lib/api";

class PermissionsService extends BaseService<
  Permission,
  CreatePermissionDto,
  UpdatePermissionDto
> {
  constructor() {
    super(API.permissions.list);
  }
}
