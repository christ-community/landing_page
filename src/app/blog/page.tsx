import React from 'react';
import FilterBar from './components/FilterBar';
import PostCard from './components/PostCard';
import EmptyState from '@/components/ui/EmptyState';
import NewsletterSection from '@/components/NewsletterSection';
import { BookOpenCheck } from 'lucide-react';
import { getBlogPosts, getCategories } from '../../../lib/contentful-api';

const BlogPage = async () => {
  const [blogPosts, categories] = await Promise.all([
    getBlogPosts(),
    getCategories()
  ]);

  return (
    <div className="py-24">
      <div className="container mx-auto px-6 lg:px-12">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold text-foreground mb-4">
            Insights & Resources
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our latest articles, case studies, and resources to help your church thrive.
          </p>
        </header>

        {blogPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {blogPosts.map((post: any) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={BookOpenCheck}
            title="No Articles Found"
            description="We couldn't find any articles matching your search or filter. Try a different category or search term."
          />
        )}
      </div>
      <div className="mt-24">
        <NewsletterSection />
      </div>
    </div>
  );
};

export default BlogPage; 