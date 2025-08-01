export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  inquiryType: string;
  subject: string;
  message: string;
}

export interface ContactHeroConfig {
  title: string;
  subtitle: string;
  backgroundImage: string;
}

export interface ContactInfoConfig {
  title: string;
  subtitle: string;
}

export interface ContactFormConfig {
  title: string;
  subtitle: string;
  submitButtonText: string;
}

export interface ContactMethod {
  icon: any;
  title: string;
  description: string;
  contact: string;
  action: string;
  actionText: string;
  color: string;
}

export interface ServiceInfo {
  icon: any;
  title: string;
  time: string;
  description: string;
}