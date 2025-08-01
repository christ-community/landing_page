// Core chat message types
export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  sessionId: string;
  confidence?: number;
  relatedTopics?: string[];
  status: 'sending' | 'sent' | 'delivered' | 'failed';
  metadata?: Record<string, unknown>;
}

// API Request/Response types based on the API spec
export interface ChatbotMessageDto {
  message: string;
  sessionId: string;
  userId?: string;
  context?: Record<string, unknown>;
}

export interface ChatbotResponseDto {
  response: string;
  sessionId: string;
  confidence: number;
  relatedTopics?: string[];
  suggestions?: string[];
  timestamp: string;
  messageId: string;
}

export interface ConversationHistoryDto {
  sessionId: string;
  messages: Array<{
    id: string;
    content: string;
    sender: 'user' | 'bot';
    timestamp: string;
    confidence?: number;
  }>;
  totalMessages: number;
  createdAt: string;
  lastActivity: string;
}

// Chat session management
export interface ChatSession {
  id: string;
  userId?: string;
  isActive: boolean;
  startedAt: Date;
  lastActivity: Date;
  messageCount: number;
  metadata: {
    userAgent: string;
    referrer: string;
    location: string;
  };
}

// Chat state management types
export interface ChatState {
  messages: ChatMessage[];
  session: ChatSession | null;
  isConnected: boolean;
  isLoading: boolean;
  error: ChatError | null;
  unreadCount: number;
  isMinimized: boolean;
  isTyping: boolean;
}

export interface ChatError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  timestamp: Date;
  isRetryable: boolean;
}

// Chat actions for state management
export type ChatAction =
  | { type: 'INITIALIZE_SESSION'; payload: ChatSession }
  | { type: 'ADD_MESSAGE'; payload: ChatMessage }
  | { type: 'UPDATE_MESSAGE'; payload: { id: string; updates: Partial<ChatMessage> } }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: ChatError | null }
  | { type: 'SET_CONNECTED'; payload: boolean }
  | { type: 'SET_TYPING'; payload: boolean }
  | { type: 'MINIMIZE_CHAT'; payload: boolean }
  | { type: 'MARK_AS_READ' }
  | { type: 'CLEAR_MESSAGES' }
  | { type: 'LOAD_HISTORY'; payload: ChatMessage[] };

// Configuration types
export interface ChatConfig {
  apiBaseUrl: string;
  maxMessages: number;
  retryAttempts: number;
  retryDelay: number;
  sessionTimeout: number;
  enablePersistence: boolean;
  enableTypingIndicator: boolean;
  enableSuggestions: boolean;
  theme: 'light' | 'dark' | 'system';
  position: 'bottom-right' | 'bottom-left' | 'bottom-center';
  welcomeMessage?: string;
  placeholderText: string;
  offlineMessage: string;
}

// Hook return types
export interface UseChatReturn {
  state: ChatState;
  actions: {
    sendMessage: (content: string) => Promise<void>;
    loadHistory: () => Promise<void>;
    clearMessages: () => void;
    minimizeChat: (minimize: boolean) => void;
    markAsRead: () => void;
    retryMessage: (messageId: string) => Promise<void>;
  };
}

// Event types for analytics/tracking
export interface ChatEvent {
  type: 'message_sent' | 'message_received' | 'session_started' | 'session_ended' | 'error_occurred';
  sessionId: string;
  timestamp: Date;
  data?: Record<string, unknown>;
}

// API response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
  timestamp: string;
  requestId: string;
}

// Storage types
export interface ChatStorage {
  sessionId: string;
  messages: ChatMessage[];
  lastActivity: string;
  metadata: Record<string, unknown>;
}