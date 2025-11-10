// Types for dashboard email functionality

export interface EmailRecipient {
  email: string;
  name: string;
}

export interface BulkEmailData {
  recipients: EmailRecipient[];
  subject: string;
  message: string;
  htmlContent?: string;
}

export interface EmailValidationResult {
  email: string;
  isValid: boolean;
  isSafe: boolean;
  reason?: string;
  suggestion?: string;
}

export interface EmailSendResult {
  email: string;
  name: string;
  success: boolean;
  error?: string;
}

export interface DashboardAuthData {
  username: string;
  password: string;
}
