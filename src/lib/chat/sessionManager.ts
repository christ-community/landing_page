import type { ChatSession, ChatStorage } from '@/types/chat';

/**
 * Session management utility for chat persistence and lifecycle
 */
export class SessionManager {
  private static readonly STORAGE_KEY = 'christ_community_chat_session';
  private static readonly SESSION_EXPIRY = 30 * 60 * 1000; // 30 minutes

  /**
   * Generate a new chat session
   */
  static generateSession(): ChatSession {
    const sessionId = this.generateSessionId();
    const now = new Date();

    return {
      id: sessionId,
      isActive: true,
      startedAt: now,
      lastActivity: now,
      messageCount: 0,
      metadata: {
        userAgent: navigator.userAgent,
        referrer: document.referrer || 'direct',
        location: window.location.href,
      },
    };
  }

  /**
   * Get existing session from storage or create new one
   */
  static getOrCreateSession(): ChatSession {
    const stored = this.getStoredSession();
    
    if (stored && this.isSessionValid(stored)) {
      return {
        ...stored,
        lastActivity: new Date(),
      };
    }

    return this.generateSession();
  }

  /**
   * Update session activity and save to storage
   */
  static updateSession(session: ChatSession, updates: Partial<ChatSession> = {}): ChatSession {
    const updatedSession: ChatSession = {
      ...session,
      ...updates,
      lastActivity: new Date(),
    };

    this.saveSession(updatedSession);
    return updatedSession;
  }

  /**
   * Save session to localStorage
   */
  static saveSession(session: ChatSession): void {
    try {
      const storage: ChatStorage = {
        sessionId: session.id,
        messages: [], // Messages are managed separately
        lastActivity: session.lastActivity.toISOString(),
        metadata: {
          ...session.metadata,
          messageCount: session.messageCount,
          startedAt: session.startedAt.toISOString(),
        },
      };

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(storage));
    } catch (error) {
      console.warn('[SessionManager] Failed to save session:', error);
    }
  }

  /**
   * Get stored session from localStorage
   */
  static getStoredSession(): ChatSession | null {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (!stored) return null;

      const storage: ChatStorage = JSON.parse(stored);
      
      return {
        id: storage.sessionId,
        isActive: true,
        startedAt: new Date(storage.metadata.startedAt as string),
        lastActivity: new Date(storage.lastActivity),
        messageCount: (storage.metadata.messageCount as number) || 0,
        metadata: {
          userAgent: storage.metadata.userAgent as string,
          referrer: storage.metadata.referrer as string,
          location: storage.metadata.location as string,
        },
      };
    } catch (error) {
      console.warn('[SessionManager] Failed to load session:', error);
      return null;
    }
  }

  /**
   * Check if session is still valid (not expired)
   */
  static isSessionValid(session: ChatSession): boolean {
    const now = Date.now();
    const lastActivity = session.lastActivity.getTime();
    return (now - lastActivity) < this.SESSION_EXPIRY;
  }

  /**
   * Clear session from storage
   */
  static clearSession(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.warn('[SessionManager] Failed to clear session:', error);
    }
  }

  /**
   * End current session
   */
  static endSession(session: ChatSession): void {
    const endedSession = {
      ...session,
      isActive: false,
      lastActivity: new Date(),
    };

    this.saveSession(endedSession);
    
    // Optionally clear from storage after a delay
    setTimeout(() => this.clearSession(), 5000);
  }

  /**
   * Generate unique session ID
   */
  private static generateSessionId(): string {
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substring(2, 15);
    return `sess_${timestamp}_${randomStr}`;
  }

  /**
   * Get session analytics data
   */
  static getSessionAnalytics(session: ChatSession): {
    duration: number;
    messageCount: number;
    isActive: boolean;
    source: string;
  } {
    const duration = Date.now() - session.startedAt.getTime();
    
    return {
      duration,
      messageCount: session.messageCount,
      isActive: session.isActive,
      source: session.metadata.referrer === 'direct' ? 'direct' : 'referral',
    };
  }

  /**
   * Check if storage is available
   */
  static isStorageAvailable(): boolean {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }
}