'use client';

import React, { memo } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Bot, 
  Clock, 
  CheckCircle, 
  XCircle, 
  RefreshCw,
  Lightbulb,
  TrendingUp
} from 'lucide-react';
import type { ChatMessage } from '@/types/chat';

interface MessageBubbleProps {
  message: ChatMessage;
  isLast?: boolean;
  onRetry?: (messageId: string) => void;
  onSendMessage?: (message: string) => void;
  className?: string;
}

const MessageBubble = memo(function MessageBubble({
  message,
  isLast = false,
  onRetry,
  onSendMessage,
  className,
}: MessageBubbleProps) {
  const isUser = message.sender === 'user';
  const isBot = message.sender === 'bot';

  const formatTime = (timestamp: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(timestamp);
  };

  const getStatusIcon = () => {
    switch (message.status) {
      case 'sending':
        return <Clock className="w-3 h-3 text-muted-foreground animate-spin" />;
      case 'sent':
        return <CheckCircle className="w-3 h-3 text-blue-500" />;
      case 'delivered':
        return <CheckCircle className="w-3 h-3 text-green-500" />;
      case 'failed':
        return <XCircle className="w-3 h-3 text-red-500" />;
      default:
        return null;
    }
  };

  const getConfidenceColor = (confidence?: number): string => {
    if (!confidence) return 'bg-gray-500';
    if (confidence >= 0.8) return 'bg-green-500';
    if (confidence >= 0.6) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div
      className={cn(
        'flex gap-3 w-full animate-in slide-in-from-bottom-2 duration-300',
        isUser ? 'justify-end' : 'justify-start',
        className
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium',
          isUser 
            ? 'bg-gradient-to-r from-blue-500 to-blue-600' 
            : 'bg-gradient-to-r from-purple-500 to-purple-600'
        )}
      >
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>

      {/* Message Content */}
      <div className={cn('flex flex-col max-w-[calc(100%-3rem)] min-w-0', isUser ? 'items-end' : 'items-start')}>
        {/* Message Bubble */}
        <div
          className={cn(
            'relative px-4 py-3 rounded-2xl shadow-sm border break-words overflow-hidden',
            'max-w-full w-fit min-w-0',
            isUser
              ? 'bg-blue-500 text-white border-blue-600 rounded-br-md'
              : 'bg-white dark:bg-slate-800 text-foreground border-border rounded-bl-md',
            message.status === 'failed' && 'border-red-300 bg-red-50 dark:bg-red-950/20'
          )}
        >
          {/* Message Text */}
          <div 
            className="text-sm leading-relaxed whitespace-pre-wrap break-words overflow-wrap-anywhere"
            style={{ 
              wordBreak: 'break-word',
              overflowWrap: 'anywhere',
              hyphens: 'auto'
            }}
          >
            {message.content}
          </div>

          {/* Bot-specific features */}
          {isBot && (
            <>
              {/* Confidence Score */}
              {message.confidence !== undefined && (
                <div className="flex items-center gap-2 mt-3 pt-2 border-t border-border/20">
                  <TrendingUp className="w-3 h-3 text-muted-foreground" />
                  <div className="flex items-center gap-1">
                    <div
                      className={cn(
                        'w-2 h-2 rounded-full',
                        getConfidenceColor(message.confidence)
                      )}
                    />
                    <span className="text-xs text-muted-foreground">
                      {Math.round(message.confidence * 100)}% confidence
                    </span>
                  </div>
                </div>
              )}

              {/* Related Topics */}
              {message.relatedTopics && message.relatedTopics.length > 0 && (
                <div className="mt-3 pt-2 border-t border-border/20">
                  <div className="flex items-center gap-1 mb-2">
                    <Lightbulb className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Related topics:</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {message.relatedTopics.slice(0, 3).map((topic, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary" 
                        className="text-xs px-2 py-0.5 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                        onClick={() => onSendMessage?.(topic)}
                      >
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Message Meta */}
        <div
          className={cn(
            'flex items-center gap-2 mt-1 px-1',
            isUser ? 'flex-row-reverse' : 'flex-row'
          )}
        >
          {/* Timestamp */}
          <span className="text-xs text-muted-foreground">
            {formatTime(message.timestamp)}
          </span>

          {/* Status Icon for User Messages */}
          {isUser && getStatusIcon()}

          {/* Retry Button for Failed Messages */}
          {message.status === 'failed' && onRetry && (
            <Button
              size="sm"
              variant="ghost"
              className="h-6 px-2 text-xs text-red-600 hover:text-red-800 hover:bg-red-100 dark:hover:bg-red-900/40 dark:hover:text-red-400"
              onClick={() => onRetry(message.id)}
            >
              <RefreshCw className="w-3 h-3 mr-1" />
              Retry
            </Button>
          )}
        </div>
      </div>
    </div>
  );
});

MessageBubble.displayName = 'MessageBubble';

export default MessageBubble;