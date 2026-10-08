import { BaseEntity } from "./common";

export interface Permission extends BaseEntity {
  name: string;
  description?: string;
  module?: string;
}

export interface CreatePermissionDto {
  name: string;
  description?: string;
  module?: string;
}

export interface UpdatePermissionDto {
  name?: string;
  description?: string;
  module?: string;
}
