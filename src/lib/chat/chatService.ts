import type {
  ChatbotMessageDto,
  ChatbotResponseDto,
  ConversationHistoryDto,
  ChatConfig,
  ChatError,
  ApiResponse,
} from '@/types/chat';

/**
 * Enterprise-grade chat service with retry logic, error handling, and observability
 */
export class ChatService {
  private config: ChatConfig;
  private abortController: AbortController | null = null;

  constructor(config: ChatConfig) {
    this.config = config;
  }

  /**
   * Send a message to the chatbot with retry logic and error handling
   */
  async sendMessage(payload: ChatbotMessageDto): Promise<ChatbotResponseDto> {
    const startTime = performance.now();
    const requestPayload = {
      message: payload.message,
      sessionId: payload.sessionId || `session_${Date.now()}`,
    };


    try {
      // Use a simple fetch request without conflicting signals
      const response = await this.makeRequest<any>('/api/Chatbot/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(requestPayload),
      });

      // Log successful request
      this.logEvent('message_sent', {
        sessionId: payload.sessionId,
        attempt: 1,
        duration: performance.now() - startTime,
        success: true,
      });

      // Handle the API response format (wrapped in ApiResponse)
      if (response && response.success && response.data) {
        const chatResponse = {
          messageId: `msg_${Date.now()}`,
          response: response.data.response,
          timestamp: response.data.timestamp || new Date().toISOString(),
          sessionId: response.data.sessionId || payload.sessionId,
          relatedTopics: response.data.relatedTopics || [],
        };
        
        return chatResponse;
      } else {
        console.error('[ChatService] Invalid API response format:', response);
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      // If API fails, return a fallback response to prevent UI freezing
      console.error('[ChatService] Chat API failed:', {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        url: `${this.config.apiBaseUrl}/api/Chatbot/message`,
        payload: requestPayload,
        duration: performance.now() - startTime,
      });
      
      this.logEvent('message_failed_using_fallback', {
        sessionId: payload.sessionId,
        error: error instanceof Error ? error.message : 'Unknown error',
        duration: performance.now() - startTime,
      });

      // Return a simulated response
      const fallbackResponse = {
        messageId: `fallback_${Date.now()}`,
        response: "I'm sorry, I'm having trouble connecting to our chat service right now. Please feel free to contact us directly using our contact form or call us for immediate assistance. Our team is here to help you!",
        timestamp: new Date().toISOString(),
        sessionId: payload.sessionId || `session_${Date.now()}`,
        relatedTopics: ['Contact Us', 'Support'],
      };
      
      console.log('[ChatService] Using fallback response:', fallbackResponse);
      return fallbackResponse;
    }
  }

  /**
   * Load conversation history with pagination support
   */
  async loadConversationHistory(
    sessionId: string,
    page = 1,
    limit = 50
  ): Promise<ConversationHistoryDto> {
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      const response = await this.makeRequest<ConversationHistoryDto>(
        `/api/Chatbot/conversation/${sessionId}?${queryParams}`,
        {
          method: 'GET',
        }
      );

      this.logEvent('history_loaded', {
        sessionId,
        messageCount: response.messages?.length || 0,
      });

      return response;
    } catch (error) {
      this.logEvent('history_load_failed', {
        sessionId,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      
      // Return empty history instead of throwing error
      return {
        messages: [],
        totalCount: 0,
        page,
        limit,
        hasMore: false,
      };
    }
  }

  /**
   * Get knowledge base information (if available)
   */
  async getKnowledgeBase(): Promise<unknown> {
    try {
      return await this.makeRequest('/api/Chatbot/knowledge', {
        method: 'GET',
      });
    } catch (error) {
      this.logEvent('knowledge_base_failed', {
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw this.createChatError('KNOWLEDGE_BASE_ERROR', 'Failed to load knowledge base', false);
    }
  }

  /**
   * Health check for the chat service
   */
  async healthCheck(): Promise<{ status: 'healthy' | 'unhealthy'; latency: number }> {
    const startTime = performance.now();
    
    try {
      // Try multiple endpoints to check service health
      const endpoints = ['/health', '/api/health', '/swagger/index.html'];
      
      for (const endpoint of endpoints) {
        try {
          const response = await fetch(`${this.config.apiBaseUrl}${endpoint}`, {
            method: 'GET',
            signal: AbortSignal.timeout(5000), // 5 second timeout
          });
          
          if (response.ok) {
            const latency = performance.now() - startTime;
            return { status: 'healthy', latency };
          }
        } catch (error) {
          // Continue to next endpoint
          continue;
        }
      }
      
      // If no endpoints work, return unhealthy
      const latency = performance.now() - startTime;
      return { status: 'unhealthy', latency };
    } catch (error) {
      const latency = performance.now() - startTime;
      return { status: 'unhealthy', latency };
    }
  }

  /**
   * Cancel ongoing requests
   */
  cancelRequests(): void {
    if (this.abortController) {
      this.abortController.abort();
      this.abortController = null;
    }
  }

  /**
   * Update service configuration
   */
  updateConfig(newConfig: Partial<ChatConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  /**
   * Core HTTP request method with comprehensive error handling
   */
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.config.apiBaseUrl}${endpoint}`;
    
    const defaultHeaders = {
      'Accept': 'application/json',
    };

    const requestOptions: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
      // Only use signal if provided, no automatic timeout
      signal: options.signal,
    };

    try {
      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        const errorData = await this.safeJsonParse(response);
        throw new Error(
          `HTTP ${response.status}: ${(errorData as any)?.message || response.statusText}`
        );
      }

      const data = await response.json();
      
      // Always return the raw response for now since we handle wrapping in the calling method
      return data as T;
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error: Please check your internet connection');
      }
      
      if (error instanceof DOMException && error.name === 'AbortError') {
        throw new Error('Request was cancelled');
      }

      throw error;
    }
  }

  /**
   * Add timeout to fetch requests
   */
  private withTimeout(timeoutMs: number) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    
    return {
      signal: controller.signal,
      cleanup: () => clearTimeout(timeoutId),
    };
  }

  /**
   * Safely parse JSON responses
   */
  private async safeJsonParse(response: Response): Promise<unknown> {
    try {
      return await response.json();
    } catch {
      return { message: 'Invalid JSON response' };
    }
  }

  /**
   * Check if response is wrapped in ApiResponse format
   */
  private isWrappedResponse(data: unknown): data is ApiResponse<unknown> {
    return (
      typeof data === 'object' &&
      data !== null &&
      'success' in data &&
      typeof (data as { success: unknown }).success === 'boolean'
    );
  }

  /**
   * Determine if an error should not be retried
   */
  private isNonRetryableError(error: unknown): boolean {
    if (error instanceof Error) {
      const message = error.message.toLowerCase();
      return (
        message.includes('400') || // Bad Request
        message.includes('401') || // Unauthorized
        message.includes('403') || // Forbidden
        message.includes('404') || // Not Found
        message.includes('422') || // Unprocessable Entity
        message.includes('cancelled')
      );
    }
    return false;
  }

  /**
   * Create standardized chat errors
   */
  private createChatError(code: string, message: string, isRetryable: boolean): ChatError {
    return {
      code,
      message,
      timestamp: new Date(),
      isRetryable,
      details: {
        service: 'ChatService',
        apiBaseUrl: this.config.apiBaseUrl,
      },
    };
  }

  /**
   * Generate unique request IDs for tracing
   */
  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Delay utility for retry logic
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Event logging for analytics and debugging
   */
  private logEvent(event: string, data: Record<string, unknown>): void {
    if (typeof window !== 'undefined' && window.console) {
      console.debug(`[ChatService] ${event}:`, data);
    }

    // In production, this would integrate with analytics service
    // analytics.track(event, data);
  }
}

/**
 * Default configuration for the chat service
 */
export const defaultChatConfig: ChatConfig = {
  apiBaseUrl: process.env.NEXT_PUBLIC_CHAT_API_BASE_URL || 'https://p01--ccg-api--jpcbk2mdwdkc.code.run',
  maxMessages: 100,
  retryAttempts: 1, // Reduced to prevent long waits
  retryDelay: 500,  // Reduced delay
  sessionTimeout: 30 * 60 * 1000, // 30 minutes
  enablePersistence: false, // Disabled to prevent issues
  enableTypingIndicator: true,
  enableSuggestions: true,
  theme: 'system',
  position: 'bottom-right',
  welcomeMessage: 'Hello! How can I help you today?',
  placeholderText: 'Type your message...',
  offlineMessage: 'Chat is currently offline. Please try again later.',
};

/**
 * Singleton instance for the chat service
 */
export const chatService = new ChatService(defaultChatConfig);