'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import { useChat } from '@/lib/chat/chatContext';
import {
  MessageCircle,
  X,
  Minimize2,
  Maximize2,
  Settings,
  Volume2,
  VolumeX,
  Trash2,
  RefreshCw,
  Wifi,
  WifiOff,
} from 'lucide-react';

interface ChatWidgetProps {
  className?: string;
  position?: 'bottom-right' | 'bottom-left' | 'bottom-center';
  theme?: 'light' | 'dark' | 'system';
}

const ChatWidget = React.memo(function ChatWidget({
  className,
  position = 'bottom-right',
  theme = 'system',
}: ChatWidgetProps) {
  const { state, actions } = useChat();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  // Handle sound notifications
  useEffect(() => {
    if (!soundEnabled) return;

    const lastMessage = state.messages[state.messages.length - 1];
    if (lastMessage?.sender === 'bot' && state.isMinimized) {
      // Play notification sound (simple implementation)
      try {
        const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTuM1fPfcSYELYHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTuM1fPfcSYELYHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTuM1fPfcSYELYHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTuM1fPfcSYE');
        audio.volume = 0.2;
        audio.play().catch(() => {
          // Ignore audio play errors (user interaction required)
        });
      } catch {
        // Ignore if audio creation fails
      }
    }
  }, [state.messages, state.isMinimized, soundEnabled]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle chat with Ctrl/Cmd + K
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        actions.minimizeChat(!state.isMinimized);
      }

      // Close chat with Escape (when not minimized)
      if (e.key === 'Escape' && !state.isMinimized) {
        actions.minimizeChat(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state.isMinimized, actions]);

  // Auto-mark as read when chat is opened
  useEffect(() => {
    if (!state.isMinimized && state.unreadCount > 0) {
      actions.markAsRead();
    }
  }, [state.isMinimized, state.unreadCount, actions]);

  const handleToggleChat = useCallback(() => {
    actions.minimizeChat(!state.isMinimized);
  }, [state.isMinimized, actions]);

  const handleToggleFullscreen = useCallback(() => {
    setIsFullscreen(prev => !prev);
  }, []);

  const handleClearMessages = useCallback(() => {
    if (window.confirm('Are you sure you want to clear all messages?')) {
      actions.clearMessages();
    }
  }, [actions]);

  const handleRetryConnection = useCallback(() => {
    window.location.reload(); // Simple retry - in production, might want more sophisticated retry
  }, []);

  const getPositionClasses = () => {
    const base = 'fixed z-50 transition-all duration-300 ease-in-out';
    
    if (isFullscreen) {
      return `${base} inset-4 md:inset-8`;
    }

    switch (position) {
      case 'bottom-left':
        return `${base} bottom-4 left-4 md:bottom-6 md:left-6`;
      case 'bottom-center':
        return `${base} bottom-4 left-1/2 transform -translate-x-1/2 md:bottom-6`;
      case 'bottom-right':
      default:
        return `${base} bottom-4 right-4 md:bottom-6 md:right-6`;
    }
  };

  // Minimized state - just the toggle button
  if (state.isMinimized) {
    return (
      <div className={getPositionClasses()}>
        <Button
          onClick={handleToggleChat}
          className={cn(
            'h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground',
            'hover:scale-105 transition-transform duration-200',
            'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
          )}
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6" />
          {state.unreadCount > 0 && (
            <Badge
              className="absolute -top-2 -right-2 h-6 w-6 p-0 bg-red-500 hover:bg-red-500 text-white border-2 border-background"
              variant="destructive"
            >
              {state.unreadCount > 99 ? '99+' : state.unreadCount}
            </Badge>
          )}
        </Button>
      </div>
    );
  }

  // Full chat interface
  return (
    <div className={getPositionClasses()}>
      <Card
        className={cn(
          'flex flex-col shadow-2xl border-border/50 bg-background/95 backdrop-blur-sm overflow-hidden',
          isFullscreen
            ? 'h-full w-full'
            : 'h-[700px] w-[400px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]',
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-border bg-muted/30 flex-shrink-0">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-4 h-4 text-primary-foreground" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-foreground text-sm truncate">
                Christ Community Chat
              </h3>
              <div className="flex items-center gap-2 text-xs">
                <div className="flex items-center gap-1">
                  {state.isConnected ? (
                    <>
                      <Wifi className="w-3 h-3 text-green-500 flex-shrink-0" />
                      <span className="text-green-600 dark:text-green-400">Online</span>
                    </>
                  ) : (
                    <>
                      <WifiOff className="w-3 h-3 text-red-500 flex-shrink-0" />
                      <span className="text-red-600 dark:text-red-400">Offline</span>
                    </>
                  )}
                </div>
                {state.isTyping && (
                  <span className="text-muted-foreground">AI is typing...</span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 flex-shrink-0">
            {/* Settings Toggle */}
            <Button
              size="sm"
              variant="ghost"
              className="h-7 w-7 p-0"
              onClick={() => setShowSettings(!showSettings)}
              title="Settings"
            >
              <Settings className="w-3.5 h-3.5" />
            </Button>

            {/* Fullscreen Toggle */}
            <Button
              size="sm"
              variant="ghost"
              className="h-7 w-7 p-0"
              onClick={handleToggleFullscreen}
              title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? (
                <Minimize2 className="w-3.5 h-3.5" />
              ) : (
                <Maximize2 className="w-3.5 h-3.5" />
              )}
            </Button>

            {/* Minimize */}
            <Button
              size="sm"
              variant="ghost"
              className="h-7 w-7 p-0"
              onClick={handleToggleChat}
              title="Minimize chat"
            >
              <X className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="flex-shrink-0 p-3 border-b border-border bg-muted/20">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Sound notifications</span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 w-7 p-0"
                  onClick={() => setSoundEnabled(!soundEnabled)}
                >
                  {soundEnabled ? (
                    <Volume2 className="w-3.5 h-3.5 text-green-600" />
                  ) : (
                    <VolumeX className="w-3.5 h-3.5 text-muted-foreground" />
                  )}
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Clear conversation</span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 w-7 p-0 text-red-600 hover:text-red-800 hover:bg-red-100 dark:hover:bg-red-900/40 dark:hover:text-red-400"
                  onClick={handleClearMessages}
                  disabled={state.messages.length === 0}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>

              {!state.isConnected && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Retry connection</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 w-7 p-0"
                    onClick={handleRetryConnection}
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Messages */}
        <MessageList
          messages={state.messages}
          isLoading={state.isLoading}
          error={state.error}
          onRetryMessage={actions.retryMessage}
          onRetryConnection={handleRetryConnection}
          onSendMessage={actions.sendMessage}
          className="flex-1 min-h-0"
        />

        {/* Input */}
        <div className="flex-shrink-0">
          <ChatInput
            onSendMessage={actions.sendMessage}
            disabled={false}
            placeholder="Let's chat! "
            isLoading={state.isLoading}
          />
        </div>
      </Card>
    </div>
  );
});

ChatWidget.displayName = 'ChatWidget';

export default ChatWidget;