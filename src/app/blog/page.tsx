'use client';

import React, { useState, useMemo } from 'react';
import { posts } from '@/lib/posts';
import FilterBar from './components/FilterBar';
import PostCard from './components/PostCard';
import EmptyState from '@/components/ui/EmptyState';
import NewsletterSection from '@/components/NewsletterSection';
import { BookOpenCheck } from 'lucide-react';

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPosts = useMemo(() => {
    return posts
      .filter((post) =>
        selectedCategory === 'All' ? true : post.category === selectedCategory
      )
      .filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [searchTerm, selectedCategory]);

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

        <FilterBar
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredPosts.map((post) => (
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