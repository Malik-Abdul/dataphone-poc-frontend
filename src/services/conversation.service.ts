import { API, api, ApiResponse } from "@/lib/api";
import { Conversation, ConversationMessage } from "@/types/chat";

class ConversationService {
  async getConversations(): Promise<ApiResponse<Conversation[]>> {
    return api.get<Conversation[]>(API.ai.conversations);
  }

  async getMessages(
    conversationId: string
  ): Promise<ApiResponse<ConversationMessage[]>> {
    return api.get<ConversationMessage[]>(API.ai.messages(conversationId));
  }
}

export const conversationService = new ConversationService();
