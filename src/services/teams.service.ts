import { API, api, ApiResponse } from "@/lib/api";
import { Team } from "@prisma/client";
import { BaseService } from "./base.service";
import { CreateTeamDto, TeamsResponse, UpdateTeamDto } from "@/types/team";

class TeamsService extends BaseService<Team, CreateTeamDto, UpdateTeamDto> {
  constructor() {
    super(API.teams.list);
  }
  getTeams(): Promise<ApiResponse<TeamsResponse>> {
    // return api.get<User[]>(API.users.list);
    return api.get<TeamsResponse>(API.teams.list);
  }
}

export const teamsService = new TeamsService();
