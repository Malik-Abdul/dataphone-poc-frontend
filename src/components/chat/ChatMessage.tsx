import { Avatar, Box, Stack } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import ChatBubble from "./ChatBubble";
import { Message } from "@/types/chat";

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: message.role === "user" ? "flex-end" : "flex-start",
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        sx={{
          alignItems: "flex-start",
          maxWidth: "80%",
          flexDirection: message.role === "user" ? "row-reverse" : "row",
        }}
      >
        <Avatar
          sx={{
            bgcolor:
              message.role === "user" ? "primary.main" : "secondary.main",
          }}
        >
          {message.role === "user" ? <PersonIcon /> : <SmartToyIcon />}
        </Avatar>

        <ChatBubble message={message} />
      </Stack>
    </Box>
  );
}
