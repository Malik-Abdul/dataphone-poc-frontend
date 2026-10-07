"use client";

import * as React from "react";
import {
  Box,
  Container,
  Paper,
  Avatar,
  Divider,
  Chip,
  Stack,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import EditIcon from "@mui/icons-material/Edit";
import { ProfileProps } from "@/types";

export default function Profile({ userData }: ProfileProps) {
  if (!userData) {
    return null;
  }
  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      {/* Header Card */}
      <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 3,
            flexWrap: "wrap",
          }}
        >
          <Avatar
            src={userData.avatar}
            sx={{ width: 90, height: 90, fontSize: 32 }}
          >
            {userData.firstName.charAt(0)}
          </Avatar>

          <Box sx={{ flex: 1 }}>
            <Typography variant="h5">{userData.firstName}</Typography>

            <Typography variant="body2" color="text.secondary">
              {userData.email}
            </Typography>

            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
              <Chip
                label={userData?.roles?.[0]?.name}
                color="primary"
                size="small"
              />
              <Chip
                label={userData?.team?.name ?? "None"}
                color="secondary"
                size="small"
              />
              <Chip
                label={userData.deleted_at ? "deleated" : "Active"}
                color={userData.deleted_at ? "default" : "success"}
                size="small"
              />
            </Stack>
          </Box>

          <Button variant="outlined" startIcon={<EditIcon />}>
            Edit Profile
          </Button>
        </Box>
      </Paper>

      {/* Details Section */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        {/* Left Info */}
        <Grid size={8}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom>
              Account Information
            </Typography>

            <Divider sx={{ mb: 2 }} />

            <InfoRow label="User ID" value={userData.id} />
            <InfoRow
              label="Full Name"
              value={`${userData.firstName} - ${userData.lastName}`}
            />
            <InfoRow label="Email" value={userData.email} />
            <InfoRow label="Role" value={userData?.roles?.[0]?.name} />
          </Paper>
        </Grid>

        {/* Right Info */}
        <Grid size={4}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom>
              Work Details
            </Typography>

            <Divider sx={{ mb: 2 }} />

            <InfoRow label="Team" value={userData?.team?.name ?? "None"} />
            <InfoRow
              label="Status"
              value={userData.deleted_at ? "deleated" : "Active"}
            />
            <InfoRow label="Joined at: " value={userData.created_at} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

/* -----------------------------
   REUSABLE ROW COMPONENT
------------------------------*/

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        py: 1,
      }}
    >
      <Typography color="text.secondary">{label}</Typography>
      <Typography>{value}</Typography>
    </Box>
  );
}
