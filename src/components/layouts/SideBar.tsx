import { useAuth } from "@/providers/AuthProvider";
import { navigation } from "@/config/navigation";
import { UserRoleTypes } from "@/types";
import MuiLink from "@mui/material/Link";
import NextLink from "next/link";
import { Box, Typography } from "@mui/material";

const SideBar = () => {
  const { user } = useAuth();

  const currentRole = user?.roles?.[0]?.name;
  const menuItems = !user
    ? []
    : navigation.filter((item) =>
        item.roles.includes(currentRole as UserRoleTypes)
      );

  return (
    <Box
      sx={(theme) => ({
        width: 256,
        minHeight: "100vh",
        bgcolor: "background.paper",
        borderRight: `1px solid ${theme.palette.divider}`,
        p: 2,
      })}
    >
      <Typography variant="h6" sx={{ mb: 3 }}>
        Navigation
      </Typography>

      <Box
        component="nav"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        {menuItems.map((item) => (
          <MuiLink
            key={item.href}
            component={NextLink}
            href={item.href}
            underline="none"
            color="text.primary"
            sx={{
              px: 1,
              py: 0.75,
              borderRadius: 1,
              "&:hover": {
                bgcolor: "action.hover",
              },
            }}
          >
            {item.title}
          </MuiLink>
        ))}
      </Box>
    </Box>
  );
};

export default SideBar;
