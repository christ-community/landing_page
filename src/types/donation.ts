export type Frequency = 'once' | 'monthly';

export interface Currency {
  value: string;
  label: string;
}

export interface DonationData {
  amount: number;
  currency: string;
  frequency: Frequency;
  isDedicated: boolean;
  dedicationMessage?: string;
  donorInfo?: {
    name?: string;
    email?: string;
  };
}

export interface PaymentIntentRequest {
  amount: number;
  currency: string;
  frequency: Frequency;
  isDedicated?: boolean;
  dedicationMessage?: string;
  donorInfo?: {
    name?: string;
    email?: string;
  };
}

export interface PaymentIntentResponse {
  sessionId: string;
  url: string;
  clientSecret?: string;
}

export interface DonationSessionData {
  amount: number;
  currency: string;
  frequency: Frequency;
  isDedicated: boolean;
  dedicationMessage?: string;
  status: 'processing' | 'completed' | 'failed';
}