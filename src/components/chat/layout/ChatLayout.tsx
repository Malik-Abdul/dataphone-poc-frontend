"use client";

import { Box, Drawer } from "@mui/material";

import ChatSidebar from "./ChatSidebar";
import ChatContent from "./ChatContent";

import { Conversation, Message } from "@/types/chat";
import { useEffect, useRef } from "react";

const DRAWER_WIDTH = 320;

interface ChatLayoutProps {
  conversations: Conversation[];
  selectedConversationId: string | null;
  messages: Message[];
  loading: boolean;
  question: string;

  onConversationSelect: (conversationId: string) => void;
  onQuestionChange: (value: string) => void;
  onSend: () => void;
  onNewConversation: () => void;
}

export default function ChatLayout({
  conversations,
  selectedConversationId,
  messages,
  loading,
  question,
  onConversationSelect,
  onQuestionChange,
  onSend,
  onNewConversation,
}: ChatLayoutProps) {
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
        height: "calc(100vh - 64px)",
      }}
    >
      <Box
        sx={{
          width: 320,
          borderRight: 1,
          borderColor: "divider",
          overflowY: "auto",
          bgcolor: "background.paper",
        }}
      >
        <ChatSidebar
          conversations={conversations}
          selectedConversationId={selectedConversationId}
          onConversationSelect={onConversationSelect}
          onNewConversation={onNewConversation}
        />
      </Box>

      <ChatContent
        messages={messages}
        loading={loading}
        question={question}
        onQuestionChange={onQuestionChange}
        onSend={onSend}
      />
    </Box>
  );
}
