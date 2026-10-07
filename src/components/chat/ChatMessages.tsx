import { RefObject } from "react";
import { Stack } from "@mui/material";

import { Message } from "@/types/chat";
import ChatMessage from "./ChatMessage";
import ChatTyping from "./ChatTyping";

interface ChatMessagesProps {
  messages: Message[];
  loading: boolean;
  bottomRef: RefObject<HTMLDivElement | null>;
}

export default function ChatMessages({
  messages,
  loading,
  bottomRef,
}: ChatMessagesProps) {
  return (
    <Stack spacing={3}>
      {(messages ?? []).map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}

      {loading && <ChatTyping />}

      <div ref={bottomRef} />
    </Stack>
  );
}
