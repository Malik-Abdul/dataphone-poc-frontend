"use client";

import {
  Box,
  Button,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { ChatSidebarProps } from "@/types/chat";

export default function ChatSidebar({
  conversations,
  selectedConversationId,
  onConversationSelect,
  onNewConversation,
}: ChatSidebarProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {/* Header */}
      <Box sx={{ p: 2 }}>
        <Typography variant="h6">Conversations</Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Select a conversation to continue chatting.
        </Typography>
      </Box>

      {/* New Conversation Button */}
      <Box sx={{ px: 2, pb: 2 }}>
        <Button
          variant="contained"
          fullWidth
          startIcon={<AddIcon />}
          onClick={onNewConversation}
        >
          New Conversation
        </Button>
      </Box>

      <Divider />

      {/* Conversation List */}
      <List
        disablePadding
        sx={{
          flex: 1,
          overflowY: "auto",
        }}
      >
        {conversations.map((conversation) => (
          <ListItemButton
            key={conversation.id}
            selected={conversation.id === selectedConversationId}
            onClick={() => onConversationSelect(conversation.id)}
            sx={{
              alignItems: "flex-start",
              py: 1.5,
            }}
          >
            <ListItemText
              primary={conversation.title}
              secondary={new Date(conversation.lastMessageAt).toLocaleString()}
              slotProps={{
                secondary: {
                  component: "div",
                },
              }}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
