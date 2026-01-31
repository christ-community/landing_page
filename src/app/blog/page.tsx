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
    <div className="section">
      <div className="section-inner">
        <header className="text-center stack-lg mb-12">
          <div className="stack">
            <p className="eyebrow">Blog</p>
            <h1>{pageHero?.title || "Insights & Resources"}</h1>
          </div>
          <p className="section-lead max-w-2xl mx-auto">
            {pageHero?.subtitle || "Explore our latest articles, case studies, and resources to help your community thrive."}
          </p>
        </header>

        <BlogContent blogPosts={blogPosts} categories={categories} />
      </div>
      <div className="mt-12">
        <NewsletterSection />
      </div>
    </div>
  );
};

export default BlogPage; 
