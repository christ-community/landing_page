import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Post } from '@/types/blog';
import { Badge } from '@/components/ui/badge';

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  return (
    <Link href={post.href} className="group block">
      <div className="overflow-hidden rounded-2xl mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
        <Image
          src={post.imageUrl}
          alt={post.title}
          width={800}
          height={450}
          className="object-cover w-full h-auto aspect-video group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <Badge variant="secondary" className="mb-3">{post.category}</Badge>
      <h3 className="text-xl font-bold text-foreground mb-3 leading-snug group-hover:text-blue-600 transition-colors">
        {post.title}
      </h3>
      <p className="text-muted-foreground text-sm mb-4">
        {post.excerpt}
      </p>
      <div className="flex items-center text-xs text-muted-foreground">
        <span>{post.author.name}</span>
        <span className="mx-2">•</span>
        <span>{post.date}</span>
      </div>
    </Link>
  );
};

export default PostCard; 