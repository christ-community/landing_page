import { EmailValidationResult } from '@/types/dashboard';

// Comprehensive email validation utility
export class EmailValidator {
  // Basic RFC 5322 compliant regex
  private static readonly EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  // Common disposable email domains
  private static readonly DISPOSABLE_DOMAINS = new Set([
    '10minutemail.com',
    'tempmail.com',
    'guerrillamail.com',
    'mailinator.com',
    'throwaway.email',
    'temp-mail.org',
    'getnada.com',
    'trashmail.com',
    'fakeinbox.com',
    'yopmail.com',
  ]);

  // Common role-based email prefixes
  private static readonly ROLE_BASED_PREFIXES = new Set([
    'admin',
    'noreply',
    'no-reply',
    'support',
    'info',
    'help',
    'contact',
    'sales',
    'marketing',
    'webmaster',
    'postmaster',
  ]);

  /**
   * Validate email syntax
   */
  static validateSyntax(email: string): boolean {
    if (!email || email.length === 0) return false;
    if (email.length > 254) return false; // RFC 5321
    
    return this.EMAIL_REGEX.test(email);
  }

  /**
   * Check if email is from a disposable domain
   */
  static isDisposable(email: string): boolean {
    const domain = email.split('@')[1]?.toLowerCase();
    return domain ? this.DISPOSABLE_DOMAINS.has(domain) : false;
  }

  /**
   * Check if email is role-based
   */
  static isRoleBased(email: string): boolean {
    const localPart = email.split('@')[0]?.toLowerCase();
    return localPart ? this.ROLE_BASED_PREFIXES.has(localPart) : false;
  }

  /**
   * Validate domain has valid structure
   */
  static validateDomain(email: string): boolean {
    const domain = email.split('@')[1];
    if (!domain) return false;

    // Check if domain has at least one dot
    if (!domain.includes('.')) return false;

    // Check domain parts
    const parts = domain.split('.');
    if (parts.length < 2) return false;

    // Check each part is valid
    for (const part of parts) {
      if (part.length === 0) return false;
      if (!/^[a-zA-Z0-9-]+$/.test(part)) return false;
      if (part.startsWith('-') || part.endsWith('-')) return false;
    }

    // Check TLD is at least 2 characters
    const tld = parts[parts.length - 1];
    if (tld.length < 2) return false;

    return true;
  }

  /**
   * Suggest corrections for common email typos
   */
  static suggestCorrection(email: string): string | null {
    const domain = email.split('@')[1]?.toLowerCase();
    if (!domain) return null;

    // Common typos
    const corrections: Record<string, string> = {
      'gmail.con': 'gmail.com',
      'gmial.com': 'gmail.com',
      'gmai.com': 'gmail.com',
      'yahooo.com': 'yahoo.com',
      'yaho.com': 'yahoo.com',
      'hotmial.com': 'hotmail.com',
      'hotmai.com': 'hotmail.com',
      'outlok.com': 'outlook.com',
      'outloo.com': 'outlook.com',
    };

    if (corrections[domain]) {
      return email.replace(domain, corrections[domain]);
    }

    return null;
  }

  /**
   * Comprehensive email validation
   */
  static async validate(email: string): Promise<EmailValidationResult> {
    email = email.trim().toLowerCase();

    // 1. Syntax validation
    if (!this.validateSyntax(email)) {
      const suggestion = this.suggestCorrection(email);
      return {
        email,
        isValid: false,
        isSafe: false,
        reason: 'Invalid email format',
        suggestion: suggestion || undefined,
      };
    }

    // 2. Domain validation
    if (!this.validateDomain(email)) {
      return {
        email,
        isValid: false,
        isSafe: false,
        reason: 'Invalid domain',
      };
    }

    // 3. Disposable email check
    if (this.isDisposable(email)) {
      return {
        email,
        isValid: true,
        isSafe: false,
        reason: 'Disposable email address detected',
      };
    }

    // 4. Role-based email check (warning only)
    if (this.isRoleBased(email)) {
      return {
        email,
        isValid: true,
        isSafe: true,
        reason: 'Role-based email (may have lower engagement)',
      };
    }

    // Email is valid and safe
    return {
      email,
      isValid: true,
      isSafe: true,
    };
  }

  /**
   * Batch validate multiple emails
   */
  static async validateBatch(emails: string[]): Promise<EmailValidationResult[]> {
    return Promise.all(emails.map(email => this.validate(email)));
  }

  /**
   * Extract valid emails from text
   */
  static extractEmails(text: string): string[] {
    const matches = text.match(/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+/g);
    return matches || [];
  }
}
