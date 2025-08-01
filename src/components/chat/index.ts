// Main chat integration component
export { default as ChatIntegration } from './ChatIntegration';

// Individual components (for advanced usage)
export { default as ChatWidget } from './ChatWidget';
export { default as MessageBubble } from './MessageBubble';
export { default as MessageList } from './MessageList';
export { default as ChatInput } from './ChatInput';

// Context and hooks
export { ChatProvider, useChat } from '@/lib/chat/chatContext';

// Types
export type {
  ChatMessage,
  ChatSession,
  ChatState,
  ChatError,
  ChatConfig,
  UseChatReturn,
} from '@/types/chat';