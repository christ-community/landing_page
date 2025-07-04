export interface Tract {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  tags: string[];
  samplePages: string[];
  pricePer100: number;
  isPopular: boolean;
  language: string;
}

export interface OrderFormConfig {
  title: string;
  subtitle: string;
  fields: {
    tract: { label: string; placeholder: string; };
    quantity: { label: string; placeholder: string; };
    name: { label: string; placeholder: string; };
    email: { label: string; placeholder: string; };
    address: { label: string; placeholder: string; };
  };
  submitButtonText: string;
}

export interface HowItWorksStep {
  step: number;
  title: string;
  description: string;
  icon: React.ElementType;
}

export interface OrderTractPageConfig {
  hero: {
    title: string;
    subtitle: string;
    backgroundImage: string;
  };
  catalog: {
    title: string;
    subtitle: string;
    filterOptions: string[];
  };
  howItWorks: {
    title: string;
    subtitle: string;
    steps: HowItWorksStep[];
  };
  orderForm: OrderFormConfig;
}

export interface OrderData {
  tractId: string;
  quantity: number;
  name: string;
  email: string;
  address: string;
  notes?: string;
} 