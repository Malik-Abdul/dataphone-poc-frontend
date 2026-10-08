import { Prisma, Role } from "@prisma/client";
export interface Team {
  id: string;
  name: string;
  description?: string | null;
  code: string;
  members?: User;
  created_at: Date;
  updated_at: Date;
  deletedAt: string | null;
}
type UserRole = {
  id: string;
  name: string;
  deletedAt: string | null;
};

export type UserRoleTypes = "Admin" | "Manager" | "User";
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: UserRole[];
  teamId?: string;
  team?: Team;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  avatar?: string;
}
export type NavItem = {
  title: string;
  href: string;
  roles: UserRoleTypes[];
};
export type UserWithTeam = Prisma.UserGetPayload<{
  include: {
    team: true;
  };
}>;

export type ProfileProps = {
  userData: User | null;
};

// {
//   "id": "3d61eb08-49ff-4916-b171-10f867cf0099",
//   "email": "malik@gmail.com",
//   "first_name": "Malik",
//   "last_name": "Awan",
//   "role": "ADMIN",
//   "teamId": null,
//   "created_at": "2026-05-17T10:06:29.470Z",
//   "updated_at": "2026-05-17T10:06:29.470Z",
//   "deleted_at": null
// }

export interface JwtPayload {
  userId: string;
}

// export type Role = "ADMIN" | "USER";
export type CurrentUser = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: Role;
  teamId: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export interface RegisterType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  teamCode?: string;
}

export interface LoginType {
  email: string;
  password: string;
}

export interface AuthContextType {
  user: User | null;
  loginState: {
    success?: boolean;
    user?: User | null;
    error?: string;
  };
  loginAction?: (formData: FormData) => void;
  isPending: boolean;
  logout: () => void;
  hasPermissions: (requiredRole: Role) => boolean;
  login: (formData: FormData) => void;
}

export type LoginResponse = {
  user: User;
  token?: string;
};

export type TableRow = {
  id: string;
  name: string;
  role: string;
  team: string;
  email: string;
  createdAt: string;
  password: string;
  history: {
    columns: [{ label: string; key: string }];
    rows: [
      {
        date: string;
        customerId: string;
        amount: number;
      }
    ];
  };
};

export type Column<T> = {
  label: string;
  key: keyof T;
};

export type TableUIProps<T extends { id: string }> = {
  tableHeaders: Column<T>[];
  tableBody: T[];
};
export type HistoryData = {
  columns: {
    label: string;
    key: string;
  }[];
  rows: {
    createdAt?: string;
    updatedAt?: string;
    deleted?: string;
  }[];
};

type TableValue = string | number | boolean | null | undefined | HistoryData;
export type SafeTableRow = {
  id: string;
  [key: string]: TableValue;
};

export type UserRow = {
  id: string;
  name: string;
  role: string;
  team: string;
  email: string;
  history: HistoryData;
};
export type TeamsRow = {
  id: string;
  name: string;
  history: HistoryData;
};

export type RolesRow = {
  id: string;
  name: string;
  history: HistoryData;
};
