import { BaseEntity, PaginationMeta } from "./common";

export interface Role extends BaseEntity {
  name: string;
  description?: string;
  isActive: boolean;
  deletedAt: string | null;
}

export interface CreateRoleDto {
  name: string;
  description?: string;
}

export interface UpdateRoleDto {
  name?: string;
  description?: string;
  isActive?: boolean;
}

export interface RolesResponse {
  roles: Role[];
  pagination: PaginationMeta;
}
