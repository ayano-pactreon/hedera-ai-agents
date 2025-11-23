export interface Message {
  id: string;
  role: 'user' | 'agent' | 'system';
  content: string;
  timestamp: Date;
  metadata?: {
    transactionId?: string;
    toolCalls?: ToolCall[];
  };
}

export interface ToolCall {
  name: string;
  input: Record<string, any>;
  output: any;
}

export interface AgentRequest {
  message: string;
  conversationId?: string;
}

export interface AgentResponse {
  message: string;
  conversationId: string;
  toolCalls?: ToolCall[];
}
