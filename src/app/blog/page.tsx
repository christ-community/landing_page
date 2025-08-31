import React from 'react';
import BlogContent from './components/BlogContent';
import NewsletterSection from '@/components/NewsletterSection';
import { getBlogPosts, getCategories, getPageHero } from '../../../lib/contentful-api';

const BlogPage = async () => {
  const [blogPosts, categories, pageHero] = await Promise.all([
    getBlogPosts(),
    getCategories(),
    getPageHero('blog')
  ]);

  return (
    <div className="py-24">
      <div className="container mx-auto px-6 lg:px-12">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold text-foreground mb-4">
            {pageHero?.title || "Insights & Resources"}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {pageHero?.subtitle || "Explore our latest articles, case studies, and resources to help your church thrive."}
          </p>
        </header>

        <BlogContent blogPosts={blogPosts} categories={categories} />
      </div>
      <div className="mt-24">
        <NewsletterSection />
      </div>
    </div>
  );
};

export default BlogPage; 