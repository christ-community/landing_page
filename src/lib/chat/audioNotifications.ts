/**
 * Audio notifications utility for chat system
 */

export interface AudioNotificationConfig {
  enabled: boolean;
  volume: number;
  sounds: {
    newMessage: string;
    messageSent: string;
    error: string;
  };
}

export const defaultAudioConfig: AudioNotificationConfig = {
  enabled: true,
  volume: 0.3,
  sounds: {
    newMessage: '/sounds/notification.mp3',
    messageSent: '/sounds/sent.mp3', 
    error: '/sounds/error.mp3',
  },
};

class AudioNotificationManager {
  private config: AudioNotificationConfig;
  private audioCache: Map<string, HTMLAudioElement> = new Map();

  constructor(config: AudioNotificationConfig = defaultAudioConfig) {
    this.config = config;
  }

  /**
   * Update configuration
   */
  updateConfig(config: Partial<AudioNotificationConfig>) {
    this.config = { ...this.config, ...config };
  }

  /**
   * Preload audio files
   */
  async preloadSounds() {
    if (!this.config.enabled) return;

    const soundPromises = Object.entries(this.config.sounds).map(
      async ([key, path]) => {
        try {
          const audio = new Audio(path);
          audio.volume = this.config.volume;
          audio.preload = 'auto';
          
          // Wait for audio to be ready
          await new Promise((resolve, reject) => {
            audio.addEventListener('canplaythrough', resolve, { once: true });
            audio.addEventListener('error', reject, { once: true });
          });
          
          this.audioCache.set(key, audio);
        } catch (error) {
          console.warn(`[AudioNotifications] Failed to preload ${key}:`, error);
        }
      }
    );

    await Promise.allSettled(soundPromises);
  }

  /**
   * Play notification sound
   */
  async playSound(soundType: keyof AudioNotificationConfig['sounds']) {
    if (!this.config.enabled) return;

    try {
      let audio = this.audioCache.get(soundType);
      
      if (!audio) {
        // Create audio on demand if not cached
        const soundPath = this.config.sounds[soundType];
        audio = new Audio(soundPath);
        audio.volume = this.config.volume;
        this.audioCache.set(soundType, audio);
      }

      // Reset audio to beginning if already played
      audio.currentTime = 0;
      
      // Play with user gesture handling
      await audio.play();
    } catch (error) {
      // Ignore audio play errors (user interaction required, file not found, etc.)
      console.debug(`[AudioNotifications] Could not play ${soundType}:`, error);
    }
  }

  /**
   * Play new message notification
   */
  async playNewMessage() {
    await this.playSound('newMessage');
  }

  /**
   * Play message sent notification
   */
  async playMessageSent() {
    await this.playSound('messageSent');
  }

  /**
   * Play error notification
   */
  async playError() {
    await this.playSound('error');
  }

  /**
   * Enable/disable notifications
   */
  setEnabled(enabled: boolean) {
    this.config.enabled = enabled;
  }

  /**
   * Set volume (0-1)
   */
  setVolume(volume: number) {
    const clampedVolume = Math.max(0, Math.min(1, volume));
    this.config.volume = clampedVolume;
    
    // Update cached audio volumes
    this.audioCache.forEach(audio => {
      audio.volume = clampedVolume;
    });
  }

  /**
   * Clear audio cache
   */
  clearCache() {
    this.audioCache.clear();
  }
}

// Export singleton instance
export const audioNotifications = new AudioNotificationManager();

/**
 * Hook for using audio notifications in components
 */
export function useAudioNotifications() {
  return {
    playNewMessage: audioNotifications.playNewMessage.bind(audioNotifications),
    playMessageSent: audioNotifications.playMessageSent.bind(audioNotifications),
    playError: audioNotifications.playError.bind(audioNotifications),
    setEnabled: audioNotifications.setEnabled.bind(audioNotifications),
    setVolume: audioNotifications.setVolume.bind(audioNotifications),
    preloadSounds: audioNotifications.preloadSounds.bind(audioNotifications),
  };
}