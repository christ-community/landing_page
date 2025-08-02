# Chat System Documentation

## Overview

Enterprise-grade live chat system for Christ Community website with modern React patterns, comprehensive error handling, and session persistence.

## Features

- ✅ **Real-time Chat**: WebSocket-like API integration with Christ Community's chat service
- ✅ **Session Persistence**: Automatic session management with 30-minute expiry
- ✅ **Error Recovery**: Comprehensive retry logic and error handling
- ✅ **Modern UI**: Responsive design with dark/light theme support
- ✅ **Accessibility**: Full keyboard navigation and screen reader support
- ✅ **Performance**: Component memoization and optimized state management
- ✅ **TypeScript**: Fully typed with comprehensive interfaces
- ✅ **Audio Notifications**: Sound alerts for new messages
- ✅ **Message History**: Persistent conversation history with date grouping
- ✅ **Status Indicators**: Connection status, typing indicators, message delivery status

## Quick Start

### Basic Integration

```tsx
import { ChatIntegration } from '@/components/chat';

export default function Layout({ children }) {
  return (
    <div>
      {children}
      <ChatIntegration />
    </div>
  );
}
```

### Custom Configuration

```tsx
import { ChatIntegration } from '@/components/chat';

const chatConfig = {
  welcomeMessage: 'Welcome to our church! How can we help you today?',
  enablePersistence: true,
  retryAttempts: 5,
  theme: 'dark' as const,
  position: 'bottom-left' as const,
};

export default function CustomChat() {
  return <ChatIntegration config={chatConfig} />;
}
```

## Components

### ChatIntegration
Main component that provides complete chat functionality with provider context.

### ChatWidget
Core chat interface with minimizable window, fullscreen mode, and settings.

### MessageList
Virtualized message list with auto-scroll, date grouping, and empty states.

### MessageBubble
Individual message display with confidence scores and retry functionality.

### ChatInput
Auto-resizing input with keyboard shortcuts and character limit.

## API Integration

Connects to Christ Community's chat API at `https://ccg-9beb62086b99.herokuapp.com/api/v1/`.

### Endpoints Used
- `POST /chatbot/message` - Send message to AI
- `GET /chatbot/history/{sessionId}` - Load conversation history
- `GET /health` - Service health check

## State Management

Uses React Context with useReducer for predictable state updates:

```tsx
interface ChatState {
  messages: ChatMessage[];
  session: ChatSession | null;
  isConnected: boolean;
  isLoading: boolean;
  error: ChatError | null;
  unreadCount: number;
  isMinimized: boolean;
  isTyping: boolean;
}
```

## Session Persistence

- Sessions expire after 30 minutes of inactivity
- Messages persist across browser sessions
- Automatic session cleanup and renewal
- Metadata tracking for analytics

## Error Handling

- **Network Errors**: Automatic retry with exponential backoff
- **API Errors**: User-friendly error messages with retry options
- **Timeout Handling**: Configurable request timeouts
- **Graceful Degradation**: Offline mode with cached messages

## Keyboard Shortcuts

- `Ctrl/Cmd + K`: Toggle chat window
- `Enter`: Send message
- `Shift + Enter`: New line
- `Escape`: Close chat or blur input

## Performance

- Message list virtualization for large conversations
- Component memoization to prevent unnecessary re-renders
- Debounced auto-save for session persistence
- Lazy loading of chat components

## Accessibility

- Full keyboard navigation support
- Screen reader compatibility
- ARIA labels and descriptions
- High contrast mode support
- Focus management

## Browser Compatibility

- Modern browsers with ES6+ support
- Chrome 70+, Firefox 65+, Safari 12+
- Mobile responsive design
- Touch gesture support

## Development

### Local Testing

The chat system includes mock responses for development:

```tsx
// Enable mock mode for development
const config = {
  apiBaseUrl: process.env.NODE_ENV === 'development' 
    ? '/api/mock' 
    : 'https://ccg-9beb62086b99.herokuapp.com/api/v1',
};
```

### Adding Custom Themes

```tsx
const customTheme = {
  primary: '#your-primary-color',
  secondary: '#your-secondary-color',
  // ... other theme variables
};
```

## Support

For issues or questions about the chat system, please refer to the API documentation at:
https://ccg-9beb62086b99.herokuapp.com/swagger/index.html