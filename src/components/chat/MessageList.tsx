'use client';

import React, { useEffect, useRef, useCallback, memo } from 'react';
import { cn } from '@/lib/utils';
import MessageBubble from './MessageBubble';
import { Button } from '@/components/ui/button';
import { ArrowDown, RefreshCw, AlertCircle } from 'lucide-react';
import type { ChatMessage, ChatError } from '@/types/chat';

interface MessageListProps {
  messages: ChatMessage[];
  isLoading?: boolean;
  error?: ChatError | null;
  onRetryMessage?: (messageId: string) => void;
  onRetryConnection?: () => void;
  onSendMessage?: (message: string) => void;
  className?: string;
}

const MessageList = memo(function MessageList({
  messages,
  isLoading = false,
  error,
  onRetryMessage,
  onRetryConnection,
  onSendMessage,
  className,
}: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = React.useState(false);
  const [isUserScrolling, setIsUserScrolling] = React.useState(false);
  const [isAtBottom, setIsAtBottom] = React.useState(true);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const wasAtBottomRef = useRef(true);

  // Auto-scroll to bottom for new messages
  const scrollToBottom = useCallback((force = false) => {
    if (!messagesEndRef.current || !containerRef.current) return;

    // Only auto-scroll if user is at bottom or if forced
    if (isAtBottom || force) {
      // Always use smooth scrolling for better UX
      messagesEndRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'end' 
      });
    }
  }, [isAtBottom]);

  // Handle scroll events to detect user scrolling
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const atBottom = scrollHeight - scrollTop - clientHeight < 10; // Small threshold
    
    wasAtBottomRef.current = atBottom;
    setIsAtBottom(atBottom);
    setShowScrollButton(!atBottom);
    
    // Clear any existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    // If user scrolled away from bottom, mark as user scrolling
    if (!atBottom) {
      setIsUserScrolling(true);
      // Reset flag after 3 seconds of no scrolling
      scrollTimeoutRef.current = setTimeout(() => {
        setIsUserScrolling(false);
      }, 3000);
    } else {
      setIsUserScrolling(false);
    }
  }, []);

  // Detect when user starts scrolling (for wheel and touch events)
  const handleUserScroll = useCallback(() => {
    // This will be handled by handleScroll callback
    // Just trigger a scroll event check
    if (containerRef.current) {
      handleScroll();
    }
  }, [handleScroll]);

  // Auto-scroll when new messages arrive
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    
    // Always scroll when user sends a message OR when user was at bottom
    if (lastMessage?.sender === 'user' || wasAtBottomRef.current) {
      // Use setTimeout to ensure DOM is updated before scrolling
      setTimeout(() => {
        scrollToBottom(true); // Force scroll for user messages
      }, 100); // Slightly longer delay for smoother animation
    }
  }, [messages.length, scrollToBottom, messages]);

  // Auto-scroll when loading state changes
  useEffect(() => {
    if (!isLoading) {
      // Add slight delay for smooth scroll after loading
      setTimeout(() => {
        scrollToBottom();
      }, 50);
    }
  }, [isLoading, scrollToBottom]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // Render loading indicator
  const renderLoadingIndicator = () => (
    <div className="flex items-center justify-center py-4">
      <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-full">
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" />
          <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce delay-100" />
          <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce delay-200" />
        </div>
        <span className="text-sm text-muted-foreground">AI is typing...</span>
      </div>
    </div>
  );

  // Render error message
  const renderError = () => {
    if (!error) return null;

    return (
      <div className="flex items-center justify-center py-4">
        <div className="flex items-center gap-3 px-4 py-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg max-w-md">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm text-red-700 dark:text-red-400 font-medium">
              {error.message}
            </p>
            {error.isRetryable && (
              <p className="text-xs text-red-600 dark:text-red-500 mt-1">
                Check your connection and try again
              </p>
            )}
          </div>
          {error.isRetryable && onRetryConnection && (
            <Button
              size="sm"
              variant="outline"
              className="h-8 text-xs border-red-300 text-red-700 hover:bg-red-100 hover:border-red-400 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-900/40 dark:hover:border-red-600"
              onClick={onRetryConnection}
            >
              <RefreshCw className="w-3 h-3 mr-1" />
              Retry
            </Button>
          )}
        </div>
      </div>
    );
  };

  // Render empty state
  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
        <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
          <div className="w-4 h-4 bg-primary rounded-full" />
        </div>
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">
        Start a conversation
      </h3>
      <p className="text-sm text-muted-foreground max-w-sm">
        Ask me anything about Christ Community, our services, beliefs, or how to get involved.
      </p>
    </div>
  );

  // Group messages by date
  const groupedMessages = React.useMemo(() => {
    const groups: { date: string; messages: ChatMessage[] }[] = [];
    let currentGroup: { date: string; messages: ChatMessage[] } | null = null;

    messages.forEach(message => {
      const messageDate = message.timestamp.toDateString();
      
      if (!currentGroup || currentGroup.date !== messageDate) {
        currentGroup = { date: messageDate, messages: [message] };
        groups.push(currentGroup);
      } else {
        currentGroup.messages.push(message);
      }
    });

    return groups;
  }, [messages]);

  const formatDateHeader = (dateString: string): string => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(date);
    }
  };

  return (
    <div className={cn('flex flex-col h-full relative', className)}>
      {/* Messages Container */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto overflow-x-hidden overscroll-behavior-contain"
        onScroll={handleScroll}
        onWheel={handleUserScroll}
        onTouchMove={handleUserScroll}
      >
        <div className="space-y-4 p-4 max-w-full min-w-0">
          {/* Empty State */}
          {messages.length === 0 && !isLoading && !error && renderEmptyState()}

          {/* Error State */}
          {error && renderError()}

          {/* Message Groups */}
          {groupedMessages.map((group, groupIndex) => (
            <div key={`group-${group.date}`} className="space-y-4 max-w-full min-w-0">
              {/* Date Header */}
              <div className="flex items-center justify-center">
                <div className="px-3 py-1 bg-muted/50 rounded-full">
                  <span className="text-xs text-muted-foreground font-medium">
                    {formatDateHeader(group.date)}
                  </span>
                </div>
              </div>

              {/* Messages in Group */}
              {group.messages.map((message, messageIndex) => (
                <MessageBubble
                  key={`msg-${message.id}`}
                  message={message}
                  isLast={
                    groupIndex === groupedMessages.length - 1 &&
                    messageIndex === group.messages.length - 1
                  }
                  onRetry={onRetryMessage}
                  onSendMessage={onSendMessage}
                />
              ))}
            </div>
          ))}

          {/* Loading Indicator */}
          {isLoading && renderLoadingIndicator()}

          {/* Scroll Anchor */}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Scroll to Bottom Button */}
      {showScrollButton && (
        <div className="absolute bottom-4 right-4">
          <Button
            size="sm"
            variant="outline"
            className="h-10 w-10 rounded-full shadow-lg bg-background/90 backdrop-blur-sm border-border/50 hover:bg-accent/80 hover:border-border transition-colors"
            onClick={() => scrollToBottom(true)}
            title="Scroll to bottom"
          >
            <ArrowDown className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
});

MessageList.displayName = 'MessageList';

export default MessageList;