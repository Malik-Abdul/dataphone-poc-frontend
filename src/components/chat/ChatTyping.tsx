"use client";

import {
  Avatar,
  Box,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";
import SmartToyIcon from "@mui/icons-material/SmartToy";

export default function ChatTyping() {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        alignItems: "center",
      }}
    >
      <Avatar>
        <SmartToyIcon />
      </Avatar>

      <Paper
        sx={{
          p: 2,
          borderRadius: 3,
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <CircularProgress size={20} />
        <Typography>Thinking...</Typography>
      </Paper>
    </Box>
  );
}
