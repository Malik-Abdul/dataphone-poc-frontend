import { Message } from "@/types/chat";
import { Paper, Typography } from "@mui/material";
import ChatSources from "./ChatSources";

interface ChatBubbleProps {
  message: Message;
}

export default function ChatBubble({ message }: ChatBubbleProps) {
  return (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        borderRadius: 3,
        bgcolor: message.role === "user" ? "primary.main" : "background.paper",
        color: message.role === "user" ? "#fff" : "text.primary",
      }}
    >
      <Typography
        sx={{
          whiteSpace: "pre-wrap",
        }}
      >
        {message.content}
      </Typography>

      <ChatSources sources={message.sources} />
    </Paper>
  );
}
