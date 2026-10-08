"use client";

import { ElementType } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Link as MuiLink,
  IconButton,
  Tooltip,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

import { useAuth } from "@/providers/AuthProvider";
import { useThemeContext } from "@/providers/ThemeProvider";

import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

type NavItem =
  | {
      id: number;
      type: "link";
      title: string;
      link: string;
      auth: "public" | "protected" | "guest";
    }
  | {
      id: number;
      type: "component";
      auth: "public" | "protected" | "guest";
      component: ElementType;
    }
  | {
      id: number;
      title: string;
      type: "info";
      auth: "public" | "protected" | "guest";
    };

export default function Header() {
  const { user } = useAuth();
  const { mode, toggleTheme } = useThemeContext();
  const pathName = usePathname();

  const nav: NavItem[] = [
    {
      id: 1,
      type: "link",
      title: "Dashboard",
      link: "/dashboard",
      auth: "public",
    },
    {
      id: 2,
      type: "component",
      component: LoginButton,
      auth: "guest",
    },
    {
      id: 3,
      title: "Phone Numbers",
      link: "/phone-numbers",
      type: "link",
      auth: "protected",
    },
    {
      id: 4,
      title: "Customers",
      link: "/customers",
      type: "link",
      auth: "protected",
    },

    {
      id: 11,
      title: `${user?.firstName ?? ""} ${user?.lastName ?? ""}`,
      type: "info",
      auth: "protected",
    },
    {
      id: 12,
      type: "component",
      component: LogoutButton,
      auth: "protected",
    },
  ];

  const filteredNav = nav.filter((item) => {
    if (item.auth === "public") return true;
    if (item.auth === "protected") return !!user;
    if (item.auth === "guest") return !user;
    return true;
  });

  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{
        bgcolor: "background.paper",
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Toolbar>
        {/* LEFT */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          {filteredNav
            .filter((item) => item.type === "link")
            .map((item) => (
              <MuiLink
                key={item.id}
                component={Link}
                href={item.link}
                underline="none"
                color={pathName === item.link ? "primary.main" : "text.primary"}
                sx={{
                  px: 1,
                  py: 0.75,
                  borderRadius: 1,
                  fontWeight: pathName === item.link ? 600 : 400,
                  transition: "0.2s",

                  "&:hover": {
                    bgcolor: "action.hover",
                  },
                }}
              >
                {item.title}
              </MuiLink>
            ))}
        </Box>

        {/* RIGHT */}
        <Box
          sx={{
            ml: "auto",
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Tooltip
            title={
              mode === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            <IconButton onClick={toggleTheme} color="inherit">
              {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>

          {filteredNav
            .filter((item) => item.type === "info")
            .map((item) => (
              <Box
                key={item.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  color: "text.primary",
                }}
              >
                <PersonIcon fontSize="small" />
                <Typography variant="body2">{item.title}</Typography>
              </Box>
            ))}

          {filteredNav
            .filter((item) => item.type === "component")
            .map((item) => {
              const Component = item.component;
              return <Component key={item.id} />;
            })}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
