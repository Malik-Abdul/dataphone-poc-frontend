"use client";

import { RefObject, useEffect, useRef } from "react";
import { Box } from "@mui/material";

import ChatMessages from "../ChatMessages";
import ChatInput from "../ChatInput";
import { Message } from "@/types/chat";

interface ChatContentProps {
  messages: Message[];
  loading: boolean;
  question: string;
  onQuestionChange: (value: string) => void;
  onSend: () => void;
}

export default function ChatContent({
  messages,
  loading,
  question,
  onQuestionChange,
  onSend,
}: ChatContentProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        bgcolor: "background.default",
      }}
    >
      {/* Messages */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          px: 3,
          py: 3,
        }}
      >
        <ChatMessages
          messages={messages}
          loading={loading}
          bottomRef={bottomRef}
        />
      </Box>

      {/* Input */}
      <ChatInput
        question={question}
        loading={loading}
        onQuestionChange={onQuestionChange}
        onSend={onSend}
      />
    </Box>
  );
}
