'use client';

import React, { useState, useRef, useCallback, KeyboardEvent } from 'react';
import { Button } from '@/components/ui/button';
// import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Send, Loader2 } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
  isLoading?: boolean;
  maxLength?: number;
  className?: string;
}

const ChatInput = React.memo(function ChatInput({
  onSendMessage,
  disabled = false,
  placeholder = 'Type your message...',
  isLoading = false,
  maxLength = 1000,
  className,
}: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = useCallback(() => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage || isLoading) return;

    onSendMessage(trimmedMessage);
    setMessage('');
    
    // Reset textarea height and restore focus
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      // Restore focus after a brief delay to ensure the message is processed
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 10);
    }
  }, [message, isLoading, onSendMessage]);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Send on Enter (but not Shift+Enter)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }

    // Allow Escape to blur the input
    if (e.key === 'Escape') {
      textareaRef.current?.blur();
    }
  }, [handleSend]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    
    // Enforce max length
    if (value.length <= maxLength) {
      setMessage(value);
    }

    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = 'auto';
    const scrollHeight = textarea.scrollHeight;
    const maxHeight = 120; // ~6 lines
    textarea.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
  }, [maxLength]);

  const canSend = message.trim().length > 0;
  const characterCount = message.length;
  const isNearLimit = characterCount > maxLength * 0.8;

  return (
    <div className={cn('border-t-2 border-border bg-background p-4 flex-shrink-0 min-h-[80px]', className)}>
      <div
        className={cn(
          'relative flex items-end gap-2 p-3 border-2 rounded-2xl transition-all duration-200 min-w-0 bg-card',
          isFocused
            ? 'border-primary ring-2 ring-primary/20 shadow-sm'
            : 'border-border hover:border-border/80'
        )}
      >
        {/* Message Input */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            disabled={false}
            className={cn(
              'min-h-[40px] max-h-[120px] resize-none border-0 p-2 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent outline-none',
              'placeholder:text-muted-foreground w-full scrollbar-none text-foreground',
              '[&::-webkit-scrollbar]:hidden [-ms-overflow-style]:none [scrollbar-width]:none'
            )}
            style={{ height: '40px' }}
          />

          {/* Character Count */}
          {isNearLimit && (
            <div className="absolute -top-6 right-0 text-xs text-muted-foreground">
              <span className={cn(characterCount >= maxLength && 'text-red-500')}>
                {characterCount}/{maxLength}
              </span>
            </div>
          )}
        </div>

        {/* Send Button */}
        <Button
          type="button"
          size="sm"
          onClick={handleSend}
          disabled={!canSend || isLoading}
          className={cn(
            'h-8 w-8 p-0 flex-shrink-0 transition-all duration-200',
            canSend && !isLoading
              ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm'
              : 'bg-muted text-muted-foreground cursor-not-allowed'
          )}
          title={
            isLoading 
              ? 'Sending...' 
              : canSend 
                ? 'Send message (Enter)' 
                : 'Type a message to send'
          }
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Input Hints */}
      <div className="flex items-center justify-between mt-2 px-1">
        <div className="text-xs text-muted-foreground">
          Press <kbd className="px-1 py-0.5 bg-muted rounded text-xs">Enter</kbd> to send, 
          <kbd className="px-1 py-0.5 bg-muted rounded text-xs ml-1">Shift+Enter</kbd> for new line
        </div>
        
        {isLoading && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <div className="flex gap-1">
              <div className="w-1 h-1 bg-current rounded-full animate-bounce" />
              <div className="w-1 h-1 bg-current rounded-full animate-bounce delay-100" />
              <div className="w-1 h-1 bg-current rounded-full animate-bounce delay-200" />
            </div>
            <span>AI is thinking...</span>
          </div>
        )}
      </div>
    </div>
  );
});

ChatInput.displayName = 'ChatInput';

export default ChatInput;