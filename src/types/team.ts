import { BaseEntity, PaginationMeta } from "./common";
import { User } from "./user";

export interface Team extends BaseEntity {
  deletedAt: unknown;
  name: string;
  description?: string;
  isActive: boolean;
  code: string;
  members?: User;
  created_at: Date;
  updated_at: Date;
}

export interface CreateTeamDto {
  name: string;
  description?: string;
}

export interface UpdateTeamDto {
  name?: string;
  description?: string;
  isActive?: boolean;
}
export interface TeamsResponse {
  teams: Team[];
  pagination: PaginationMeta;
}
