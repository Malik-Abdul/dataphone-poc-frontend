export interface AskQuestionRequest {
  question: string;
  conversationId?: string | null;
}

export interface Source {
  page: number;
  chunkIndex: number;
  distance: number;
  rerankScore?: number;
}

export interface AskQuestionResponse {
  answer: string;
  sources: Source[];
  conversationId: string;
}
export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: {
    page: number;
    chunk: number;
  }[];
};
export interface Conversation {
  // lastMessage?: string;
  // lastMessageAt?: string;
  // unreadCount?: number;
  createdAt: string;
  deletedAt: string;
  lastMessageAt: string;
  title: string;
  updatedAt: string | null;
  userId: string;
  id: string;
}

export interface ConversationMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
}

export interface ChatSidebarProps {
  conversations: Conversation[];
  selectedConversationId: string | null;
  onConversationSelect: (conversationId: string) => void;
  onNewConversation: () => void;
}
