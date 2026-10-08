import { BaseEntity } from "./common";
import { PaginationMeta } from "./common";
import { Role } from "./role";
import { Team } from "./team";

export interface User extends BaseEntity {
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  roles: Role[];
  teamId?: string;
  team?: Team;
  deletedAt: string | null;
  avatar?: string;
}

export interface CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  isActive?: boolean;
}
export interface UsersResponse {
  users: User[];
  pagination: PaginationMeta;
}
