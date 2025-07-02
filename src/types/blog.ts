export const blogCategories = ['Faith & Doctrine', 'Community & Outreach', 'Sermons & Series', 'Church Life', 'Testimonies'] as const;

export type Category = typeof blogCategories[number];

export interface Post {
    id: string;
    title: string;
    excerpt: string;
    content?: string;
    author: {
      name:string;
      avatar?: string;
    };
    date: string;
    category: Category;
    imageUrl: string;
    href: string;
} 