// Advanced security utilities for OmniInvest

// Encryption utilities
export class EncryptionManager {
  private static instance: EncryptionManager;
  private encryptionKey: CryptoKey | null = null;
  private static readonly KEY_STORAGE_NAME = 'omni_encryption_key';

  static getInstance(): EncryptionManager {
    if (!EncryptionManager.instance) {
      EncryptionManager.instance = new EncryptionManager();
    }
    return EncryptionManager.instance;
  }

  async initialize(): Promise<void> {
    if (!this.encryptionKey) {
      this.encryptionKey = await this.loadOrGenerateKey();
    }
  }

  private async loadOrGenerateKey(): Promise<CryptoKey> {
    try {
      // Try to load existing key from localStorage
      const storedKey = localStorage.getItem(EncryptionManager.KEY_STORAGE_NAME);
      if (storedKey) {
        const keyData = JSON.parse(storedKey);
        const importedKey = await crypto.subtle.importKey(
          'jwk',
          keyData,
          {
            name: 'AES-GCM',
            length: 256,
          },
          true,
          ['encrypt', 'decrypt']
        );
        return importedKey;
      }
    } catch (error) {
      // If loading fails, generate new key
      console.warn('Failed to load encryption key, generating new one:', error);
    }

    // Generate new key and store it
    const newKey = await this.generateKey();
    await this.storeKey(newKey);
    return newKey;
  }

  private async storeKey(key: CryptoKey): Promise<void> {
    try {
      const exportedKey = await crypto.subtle.exportKey('jwk', key);
      localStorage.setItem(EncryptionManager.KEY_STORAGE_NAME, JSON.stringify(exportedKey));
    } catch (error) {
      console.error('Failed to store encryption key:', error);
    }
  }

  async generateKey(): Promise<CryptoKey> {
    return await crypto.subtle.generateKey(
      {
        name: 'AES-GCM',
        length: 256,
      },
      true,
      ['encrypt', 'decrypt']
    );
  }

  async encrypt(data: string): Promise<string> {
    await this.initialize();

    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const iv = crypto.getRandomValues(new Uint8Array(12));

    const encryptedBuffer = await crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv: iv,
      },
      this.encryptionKey,
      dataBuffer
    );

    const encryptedArray = new Uint8Array(encryptedBuffer);
    const combinedArray = new Uint8Array(iv.length + encryptedArray.length);
    combinedArray.set(iv);
    combinedArray.set(encryptedArray, iv.length);

    return btoa(String.fromCharCode(...combinedArray));
  }

  async decrypt(encryptedData: string): Promise<string> {
    await this.initialize();

    const combinedArray = new Uint8Array(
      atob(encryptedData).split('').map(char => char.charCodeAt(0))
    );

    const iv = combinedArray.slice(0, 12);
    const encryptedArray = combinedArray.slice(12);

    const decryptedBuffer = await crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv: iv,
      },
      this.encryptionKey,
      encryptedArray
    );

    const decoder = new TextDecoder();
    return decoder.decode(decryptedBuffer);
  }
}

// Secure storage with encryption
export class SecureStorage {
  private static encryptionManager = EncryptionManager.getInstance();

  static async setItem(key: string, value: any): Promise<void> {
    try {
      const serializedValue = JSON.stringify(value);
      const encryptedValue = await this.encryptionManager.encrypt(serializedValue);
      localStorage.setItem(`secure_${key}`, encryptedValue);
    } catch (error) {
      console.error('Secure storage set failed:', error);
      throw new Error('Failed to securely store data');
    }
  }

  static async getItem<T>(key: string): Promise<T | null> {
    try {
      const encryptedValue = localStorage.getItem(`secure_${key}`);
      if (!encryptedValue) return null;

      const decryptedValue = await this.encryptionManager.decrypt(encryptedValue);
      return JSON.parse(decryptedValue);
    } catch (error) {
      console.error('Secure storage get failed:', error);
      return null;
    }
  }

  static removeItem(key: string): void {
    localStorage.removeItem(`secure_${key}`);
  }

  static clear(): void {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('secure_')) {
        localStorage.removeItem(key);
      }
    });
  }
}

// Input sanitization
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocols
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
};

// XSS protection
export const escapeHtml = (unsafe: string): string => {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

// CSRF token generation
export const generateCSRFToken = (): string => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

// Secure random string generation
export const generateSecureRandom = (length: number): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, byte => chars[byte % chars.length]).join('');
};

// Password strength validation
export const validatePasswordStrength = (password: string): {
  score: number;
  feedback: string[];
  isStrong: boolean;
} => {
  const feedback: string[] = [];
  let score = 0;

  if (password.length >= 12) score += 2;
  else if (password.length >= 8) score += 1;
  else feedback.push('Password should be at least 8 characters');

  if (/[a-z]/.test(password)) score += 1;
  else feedback.push('Add lowercase letters');

  if (/[A-Z]/.test(password)) score += 1;
  else feedback.push('Add uppercase letters');

  if (/[0-9]/.test(password)) score += 1;
  else feedback.push('Add numbers');

  if (/[^A-Za-z0-9]/.test(password)) score += 2;
  else feedback.push('Add special characters');

  if (!/(.)\1{2,}/.test(password)) score += 1;
  else feedback.push('Avoid repeated characters');

  return {
    score: Math.min(score, 8),
    feedback,
    isStrong: score >= 6
  };
};

// Rate limiting
export class RateLimiter {
  private static requests: Map<string, number[]> = new Map();

  static isAllowed(identifier: string, maxRequests: number, windowMs: number): boolean {
    const now = Date.now();
    const windowStart = now - windowMs;
    
    if (!this.requests.has(identifier)) {
      this.requests.set(identifier, []);
    }

    const userRequests = this.requests.get(identifier)!;
    
    // Remove old requests outside the window
    const validRequests = userRequests.filter(timestamp => timestamp > windowStart);
    
    if (validRequests.length >= maxRequests) {
      return false;
    }

    validRequests.push(now);
    this.requests.set(identifier, validRequests);
    return true;
  }
}

// Device fingerprinting for security
export const generateDeviceFingerprint = async (): Promise<string> => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillText('Device fingerprint', 2, 2);
  }

  const fingerprint = {
    userAgent: navigator.userAgent,
    language: navigator.language,
    platform: navigator.platform,
    screen: `${screen.width}x${screen.height}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    canvas: canvas.toDataURL(),
    webgl: getWebGLFingerprint(),
  };

  const fingerprintString = JSON.stringify(fingerprint);
  const encoder = new TextEncoder();
  const data = encoder.encode(fingerprintString);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

const getWebGLFingerprint = (): string => {
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  
  if (!gl) return 'no-webgl';
  
  const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
  if (!debugInfo) return 'no-debug-info';
  
  const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
  const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
  
  return `${vendor}~${renderer}`;
};

// Secure API request wrapper
export const secureApiRequest = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  const csrfToken = generateCSRFToken();
  const deviceFingerprint = await generateDeviceFingerprint();

  const secureHeaders = {
    'Content-Type': 'application/json',
    'X-CSRF-Token': csrfToken,
    'X-Device-Fingerprint': deviceFingerprint,
    'X-Requested-With': 'XMLHttpRequest',
    ...options.headers,
  };

  const secureOptions: RequestInit = {
    ...options,
    headers: secureHeaders,
    credentials: 'same-origin',
  };

  return fetch(url, secureOptions);
};

// Session management
export class SessionManager {
  private static readonly SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
  private static timeoutId: NodeJS.Timeout | null = null;

  static startSession(): void {
    this.resetTimeout();
    this.trackActivity();
  }

  static resetTimeout(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this.timeoutId = setTimeout(() => {
      this.endSession();
    }, this.SESSION_TIMEOUT);
  }

  static endSession(): void {
    SecureStorage.clear();
    window.location.href = '/login';
  }

  private static trackActivity(): void {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    
    events.forEach(event => {
      document.addEventListener(event, () => {
        this.resetTimeout();
      }, { passive: true });
    });
  }
}

// Audit logging
export class AuditLogger {
  static async log(action: string, details: any = {}): Promise<void> {
    const logEntry = {
      timestamp: new Date().toISOString(),
      action,
      details,
      userAgent: navigator.userAgent,
      url: window.location.href,
      sessionId: await this.getSessionId(),
    };

    // In production, send to secure logging service
    console.log('Audit Log:', logEntry);
    
    // Store locally for offline capability
    const logs = await SecureStorage.getItem<any[]>('audit_logs') || [];
    logs.push(logEntry);
    
    // Keep only last 100 logs locally
    if (logs.length > 100) {
      logs.splice(0, logs.length - 100);
    }
    
    await SecureStorage.setItem('audit_logs', logs);
  }

  private static async getSessionId(): Promise<string> {
    let sessionId = await SecureStorage.getItem<string>('session_id');
    if (!sessionId) {
      sessionId = generateSecureRandom(32);
      await SecureStorage.setItem('session_id', sessionId);
    }
    return sessionId;
  }
}

// Content Security Policy helper
export const setupCSP = (): void => {
  const meta = document.createElement('meta');
  meta.httpEquiv = 'Content-Security-Policy';
  meta.content = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://js.stripe.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https:",
    "connect-src 'self' https://api.omniinvest.com wss://ws.omniinvest.com https://api.stripe.com https://api.republic.co",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self' https://checkout.stripe.com",
    "upgrade-insecure-requests"
  ].join('; ');
  
  document.head.appendChild(meta);
}