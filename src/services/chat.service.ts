import { API, api, ApiResponse } from "@/lib/api";
import { AskQuestionRequest, AskQuestionResponse } from "@/types/chat";

class ChatService {
  async askQuestion(
    payload: AskQuestionRequest
  ): Promise<ApiResponse<AskQuestionResponse>> {
    return api.post<AskQuestionResponse>(API.ai.chat, payload);
  }
}

export const chatService = new ChatService();
