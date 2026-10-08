// config/navigation.ts
import { NavItem } from "@/types";
import { Role } from "@prisma/client";

export const navigation: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    roles: ["Admin", "Manager", "User"],
  },
  {
    title: "Users",
    href: "/users",
    roles: ["Admin"],
  },
  {
    title: "Teams",
    href: "/teams",
    roles: ["Admin", "Manager"],
  },
  {
    title: "Roles",
    href: "/roles",
    roles: ["Admin"],
  },
  {
    title: "Profile",
    href: "/my-profile",
    roles: ["Admin", "Manager", "User"],
  },
];
