'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  content: string;
}

const ChatBot: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      content: "Hi there! How can we help you today?",
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to the latest message when they change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      content: inputValue,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue('');

    // Placeholder bot response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + '-bot',
          sender: 'bot',
          content: "Thanks for reaching out! We'll get back to you shortly.",
        },
      ]);
    }, 800);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen} modal={false}>
        {/* Trigger Button */}
        <DialogTrigger asChild>
          <Button
            size="lg"
            className={cn(
              'fixed bottom-6 right-6 z-40 rounded-full shadow-2xl transition-all flex items-center space-x-2',
              'bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-700',
              'hover:bg-gray-50 dark:hover:bg-gray-800 hover:shadow-xl hover:scale-105',
              'backdrop-blur-sm px-6 py-3'
            )}
          >
            <MessageCircle className="h-5 w-5" />
            <span className="font-medium">Chat</span>
          </Button>
        </DialogTrigger>

        {/* Chat Window */}
        <DialogContent className="p-0 animate-in fade-in slide-in-from-bottom-4 w-80 sm:w-96 h-[560px]">
          <div className="flex flex-col h-full">
            {/* Gradient Header */}
            <div className="relative">
              <div className="p-4 bg-gradient-to-r from-tertiary via-tertiary/80 to-secondary text-secondary-foreground flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white font-semibold text-sm">C</div>
                  <div>
                    <p className="text-sm font-semibold">Chat with us!</p>
                    <p className="text-xs opacity-80">We typically reply in few minutes.</p>
                  </div>
                </div>
                <DialogClose asChild>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                    <X className="h-4 w-4" />
                  </Button>
                </DialogClose>
              </div>
              {/* Wave bottom using svg */}
              <svg className="w-full h-4 text-white" viewBox="0 0 500 20" preserveAspectRatio="none">
                <path d="M0 20 C150 0 350 0 500 20 L500 00 L0 0 Z" fill="currentColor" />
              </svg>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background">
              {messages.map((msg) => (
                <ChatBubble key={msg.id} message={msg} />
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center space-x-2 p-4 border-t border-border/20 bg-background"
            >
              <Input
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <Button type="submit" size="icon" className="bg-primary hover:bg-primary/90">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

interface ChatBubbleProps {
  message: ChatMessage;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  return (
    <div className={cn('flex', isUser ? 'justify-end' : 'justify-start')}>
      <Card
        className={cn(
          'px-4 py-2 max-w-[75%] text-sm whitespace-pre-wrap',
          isUser
            ? 'bg-primary text-primary-foreground rounded-br-none'
            : 'bg-background border border-border/30 rounded-bl-none'
        )}
      >
        {message.content}
      </Card>
    </div>
  );
};

export default ChatBot; 