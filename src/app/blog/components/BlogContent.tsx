'use client';

import React, { useState, useMemo } from 'react';
import FilterBar from './FilterBar';
import PostCard from './PostCard';
import EmptyState from '@/components/ui/EmptyState';
import { BookOpenCheck } from 'lucide-react';

interface BlogContentProps {
  blogPosts: any[];
  categories: any[];
}

const BlogContent = ({ blogPosts, categories }: BlogContentProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const transformPost = (post: any) => ({
    ...post,
    href: `/blog/${post.slug}`,
    imageUrl: post.featuredImage?.fields?.file?.url ? `https:${post.featuredImage.fields.file.url}` : '/default-blog-image.jpg',
    author: typeof post.author?.fields?.name === 'string' ? { name: post.author.fields.name } : { name: 'Christ Community Team' },
    date: new Date(post.publishDate).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    category: typeof post.category?.fields?.name === 'string' ? post.category.fields.name : 'Uncategorized'
  });

  const filteredPosts = useMemo(() => {
    let filtered = blogPosts;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((post: any) => 
        typeof post.category?.fields?.name === 'string' && post.category.fields.name === selectedCategory
      );
    }

    // Filter by search term
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter((post: any) =>
        post.title.toLowerCase().includes(lowerSearchTerm) ||
        post.excerpt.toLowerCase().includes(lowerSearchTerm)
      );
    }

    return filtered.map(transformPost);
  }, [blogPosts, selectedCategory, searchTerm]);

  return (
    <>
      <FilterBar
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        categories={categories}
      />

      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredPosts.map((post: any) => (
            <PostCard key={post.id || post.sys?.id} post={post} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={BookOpenCheck}
          title="No Articles Found"
          description="We couldn't find any articles matching your search or filter. Try a different category or search term."
        />
      )}
    </>
  );
};

export default BlogContent;