export interface BaseComponent {
  id: string;
  isVisible?: boolean;
  className?: string;
}

export interface ContentfulAsset {
  url: string;
  title: string;
  description?: string;
  width?: number;
  height?: number;
}

export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  image?: ContentfulAsset;
}

export interface PageConfig {
  slug: string;
  title: string;
  seo: SEOData;
  isPublished: boolean;
  publishedAt?: string;
  updatedAt?: string;
} 