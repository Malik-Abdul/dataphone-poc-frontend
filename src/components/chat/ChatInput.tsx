"use client";

import { KeyboardEvent } from "react";
import { IconButton, Paper, Stack, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

interface ChatInputProps {
  question: string;
  loading: boolean;
  onQuestionChange: (value: string) => void;
  onSend: () => void;
}

export default function ChatInput({
  question,
  loading,
  onQuestionChange,
  onSend,
}: ChatInputProps) {
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <Paper
      elevation={3}
      square
      sx={{
        borderTop: 1,
        borderColor: "divider",
        p: 2,
        bgcolor: "background.paper",
      }}
    >
      <Stack direction="row" spacing={2}>
        <TextField
          fullWidth
          multiline
          maxRows={5}
          placeholder="Ask anything about your documents..."
          value={question}
          onChange={(e) => onQuestionChange(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <IconButton
          color="primary"
          onClick={onSend}
          disabled={loading || !question.trim()}
        >
          <SendIcon />
        </IconButton>
      </Stack>
    </Paper>
  );
}
