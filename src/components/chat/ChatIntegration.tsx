'use client';

import React from 'react';
import { ChatProvider } from '@/lib/chat/chatContext';
import ChatWidget from './ChatWidget';
import type { ChatConfig } from '@/types/chat';

interface ChatIntegrationProps {
  config?: Partial<ChatConfig>;
  position?: 'bottom-right' | 'bottom-left' | 'bottom-center';
  theme?: 'light' | 'dark' | 'system';
  className?: string;
}

/**
 * Chat integration component that provides the complete chat experience
 * Use this component to add chat functionality to any page
 */
const ChatIntegration = React.memo(function ChatIntegration({
  config = {},
  position = 'bottom-right',
  theme = 'system',
  className,
}: ChatIntegrationProps) {
  const defaultConfig: Partial<ChatConfig> = {
    enablePersistence: true,
    retryAttempts: 3,
    retryDelay: 1000,
    welcomeMessage: 'Hello! I\'m here to help you learn more about Christ Community. How can I assist you today?',
    ...config,
  };

  return (
    <ChatProvider config={defaultConfig}>
      <ChatWidget
        position={position}
        theme={theme}
        className={className}
      />
    </ChatProvider>
  );
});

ChatIntegration.displayName = 'ChatIntegration';

export default ChatIntegration;