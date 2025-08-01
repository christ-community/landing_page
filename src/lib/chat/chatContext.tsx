'use client';

import React, { createContext, useContext, useReducer, useEffect, useCallback, useRef } from 'react';
import type { 
  ChatState, 
  ChatAction, 
  ChatMessage, 
  ChatConfig, 
  UseChatReturn,
  ChatSession 
} from '@/types/chat';
import { chatService, defaultChatConfig } from './chatService';
import { SessionManager } from './sessionManager';

/**
 * Initial chat state
 */
const initialState: ChatState = {
  messages: [],
  session: null,
  isConnected: true,
  isLoading: false,
  error: null,
  unreadCount: 0,
  isMinimized: true,
  isTyping: false,
};

/**
 * Chat reducer for state management
 */
function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case 'INITIALIZE_SESSION':
      return {
        ...state,
        session: action.payload,
        isConnected: true,
        error: null,
      };

    case 'ADD_MESSAGE':
      const newMessage = action.payload;
      const updatedMessages = [...state.messages, newMessage];
      
      // Trim messages if exceeding max limit
      const maxMessages = 100; // Could be from config
      const trimmedMessages = updatedMessages.length > maxMessages 
        ? updatedMessages.slice(-maxMessages)
        : updatedMessages;

      return {
        ...state,
        messages: trimmedMessages,
        unreadCount: newMessage.sender === 'bot' && state.isMinimized 
          ? state.unreadCount + 1 
          : state.unreadCount,
        session: state.session ? {
          ...state.session,
          messageCount: state.session.messageCount + 1,
          lastActivity: new Date(),
        } : state.session,
      };

    case 'UPDATE_MESSAGE':
      return {
        ...state,
        messages: state.messages.map(msg =>
          msg.id === action.payload.id
            ? { ...msg, ...action.payload.updates }
            : msg
        ),
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    case 'SET_CONNECTED':
      return {
        ...state,
        isConnected: action.payload,
        error: action.payload ? null : state.error,
      };

    case 'SET_TYPING':
      return {
        ...state,
        isTyping: action.payload,
      };

    case 'MINIMIZE_CHAT':
      return {
        ...state,
        isMinimized: action.payload,
        unreadCount: action.payload ? state.unreadCount : 0,
      };

    case 'MARK_AS_READ':
      return {
        ...state,
        unreadCount: 0,
      };

    case 'CLEAR_MESSAGES':
      return {
        ...state,
        messages: [],
        error: null,
      };

    case 'LOAD_HISTORY':
      // Merge with existing messages, avoiding duplicates
      const existingIds = new Set(state.messages.map(m => m.id));
      const newHistoryMessages = action.payload.filter(m => !existingIds.has(m.id));
      
      return {
        ...state,
        messages: [...newHistoryMessages, ...state.messages].sort(
          (a, b) => a.timestamp.getTime() - b.timestamp.getTime()
        ),
      };

    default:
      return state;
  }
}

/**
 * Chat context type
 */
interface ChatContextType {
  state: ChatState;
  dispatch: React.Dispatch<ChatAction>;
  config: ChatConfig;
}

/**
 * Chat context
 */
const ChatContext = createContext<ChatContextType | null>(null);

/**
 * Chat provider props
 */
interface ChatProviderProps {
  children: React.ReactNode;
  config?: Partial<ChatConfig>;
}

/**
 * Chat provider component
 */
export function ChatProvider({ children, config = {} }: ChatProviderProps) {
  const mergedConfig = { ...defaultChatConfig, ...config };
  const [state, dispatch] = useReducer(chatReducer, initialState);
  const initializationRef = useRef(false);

  // Initialize chat session on mount
  useEffect(() => {
    if (initializationRef.current) return;
    initializationRef.current = true;

    const initializeChat = async () => {
      try {
        // Get or create session
        const session = SessionManager.getOrCreateSession();
        dispatch({ type: 'INITIALIZE_SESSION', payload: session });

        // Update chat service config
        chatService.updateConfig(mergedConfig);

        // Assume connected initially - will be updated on first API call
        dispatch({ type: 'SET_CONNECTED', payload: true });

        // Load conversation history if session exists
        if (mergedConfig.enablePersistence && session.messageCount > 0) {
          try {
            const history = await chatService.loadConversationHistory(session.id);
            const messages: ChatMessage[] = history.messages.map(msg => ({
              id: msg.id,
              content: msg.content,
              sender: msg.sender,
              timestamp: new Date(msg.timestamp),
              sessionId: session.id,
              confidence: msg.confidence,
              status: 'delivered',
            }));
            
            dispatch({ type: 'LOAD_HISTORY', payload: messages });
          } catch (error) {
            console.warn('[ChatProvider] Failed to load history:', error);
          }
        }

        // Add welcome message if no messages exist and no previous session
        if (session.messageCount === 0 && mergedConfig.welcomeMessage) {
          const welcomeMessage: ChatMessage = {
            id: `welcome_${Date.now()}`,
            content: mergedConfig.welcomeMessage,
            sender: 'bot',
            timestamp: new Date(),
            sessionId: session.id,
            status: 'delivered',
          };
          
          dispatch({ type: 'ADD_MESSAGE', payload: welcomeMessage });
        }

      } catch (error) {
        console.error('[ChatProvider] Initialization failed:', error);
        dispatch({
          type: 'SET_ERROR',
          payload: {
            code: 'INITIALIZATION_FAILED',
            message: 'Failed to initialize chat service',
            timestamp: new Date(),
            isRetryable: true,
          },
        });
      }
    };

    initializeChat();
  }, [mergedConfig]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      chatService.cancelRequests();
      if (state.session) {
        SessionManager.updateSession(state.session);
      }
    };
  }, [state.session]);

  // Auto-save session periodically
  useEffect(() => {
    if (!state.session) return;

    const interval = setInterval(() => {
      SessionManager.updateSession(state.session!);
    }, 30000); // Save every 30 seconds

    return () => clearInterval(interval);
  }, [state.session]);

  const contextValue: ChatContextType = {
    state,
    dispatch,
    config: mergedConfig,
  };

  return (
    <ChatContext.Provider value={contextValue}>
      {children}
    </ChatContext.Provider>
  );
}

/**
 * Hook to use chat functionality
 */
export function useChat(): UseChatReturn {
  const context = useContext(ChatContext);
  
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }

  const { state, dispatch, config } = context;

  /**
   * Send a message to the chatbot
   */
  const sendMessage = useCallback(async (content: string) => {
    if (!state.session || !content.trim()) return;

    const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Add user message immediately
    const userMessage: ChatMessage = {
      id: messageId,
      content: content.trim(),
      sender: 'user',
      timestamp: new Date(),
      sessionId: state.session.id,
      status: 'sending',
    };

    dispatch({ type: 'ADD_MESSAGE', payload: userMessage });
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      // Update message status to sent
      dispatch({
        type: 'UPDATE_MESSAGE',
        payload: { id: messageId, updates: { status: 'sent' } },
      });

      // Send to API
      const response = await chatService.sendMessage({
        message: content.trim(),
        sessionId: state.session.id,
        context: {
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
        },
      });

      // Add bot response
      const botMessage: ChatMessage = {
        id: response.messageId || `bot_${Date.now()}`,
        content: response.response,
        sender: 'bot',
        timestamp: new Date(response.timestamp),
        sessionId: state.session.id,
        confidence: response.confidence,
        relatedTopics: response.relatedTopics,
        status: 'delivered',
      };

      dispatch({ type: 'ADD_MESSAGE', payload: botMessage });
      dispatch({
        type: 'UPDATE_MESSAGE',
        payload: { id: messageId, updates: { status: 'delivered' } },
      });

      // Update connection status to ensure it's connected after successful response
      dispatch({ type: 'SET_CONNECTED', payload: true });
      
      // Clear any previous errors
      dispatch({ type: 'SET_ERROR', payload: null });

      // Update session
      SessionManager.updateSession(state.session);

    } catch (error) {
      console.error('[useChat] Send message failed:', error);
      
      // Update connection status if it's a network error
      if (error instanceof Error && error.message.includes('Network error')) {
        dispatch({ type: 'SET_CONNECTED', payload: false });
      }
      
      // Update message status to failed
      dispatch({
        type: 'UPDATE_MESSAGE',
        payload: { id: messageId, updates: { status: 'failed' } },
      });

      // Set error state
      dispatch({
        type: 'SET_ERROR',
        payload: {
          code: 'MESSAGE_SEND_FAILED',
          message: error instanceof Error ? error.message : 'Failed to send message',
          timestamp: new Date(),
          isRetryable: true,
        },
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [state.session]);

  /**
   * Load conversation history
   */
  const loadHistory = useCallback(async () => {
    if (!state.session) return;

    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      const history = await chatService.loadConversationHistory(state.session.id);
      const messages: ChatMessage[] = history.messages.map(msg => ({
        id: msg.id,
        content: msg.content,
        sender: msg.sender,
        timestamp: new Date(msg.timestamp),
        sessionId: state.session!.id,
        confidence: msg.confidence,
        status: 'delivered',
      }));

      dispatch({ type: 'LOAD_HISTORY', payload: messages });
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: {
          code: 'HISTORY_LOAD_FAILED',
          message: 'Failed to load conversation history',
          timestamp: new Date(),
          isRetryable: true,
        },
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [state.session]);

  /**
   * Clear all messages
   */
  const clearMessages = useCallback(() => {
    dispatch({ type: 'CLEAR_MESSAGES' });
    if (state.session) {
      SessionManager.updateSession(state.session, { messageCount: 0 });
    }
  }, [state.session]);

  /**
   * Minimize/maximize chat
   */
  const minimizeChat = useCallback((minimize: boolean) => {
    dispatch({ type: 'MINIMIZE_CHAT', payload: minimize });
  }, []);

  /**
   * Mark messages as read
   */
  const markAsRead = useCallback(() => {
    dispatch({ type: 'MARK_AS_READ' });
  }, []);

  /**
   * Retry a failed message
   */
  const retryMessage = useCallback(async (messageId: string) => {
    const message = state.messages.find(m => m.id === messageId);
    if (!message || message.sender !== 'user') return;

    await sendMessage(message.content);
  }, [state.messages, sendMessage]);

  return {
    state,
    actions: {
      sendMessage,
      loadHistory,
      clearMessages,
      minimizeChat,
      markAsRead,
      retryMessage,
    },
  };
}