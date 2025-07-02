import 'server-only';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import readingTime from 'reading-time';
import { posts } from '@/lib/posts';
import { Badge } from '@/components/ui/badge';
import PostCard from '../components/PostCard';
import NewsletterSection from '@/components/NewsletterSection';
import { BookOpen } from 'lucide-react';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

const BlogPostPage = async ({ params }: BlogPostPageProps) => {
  const { slug } = params;
  const post = posts.find((p) => p.href === `/blog/${slug}`);

  if (!post || !post.content) {
    notFound();
  }

  const stats = readingTime(post.content);
  const otherPosts = posts.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <div className="py-24">
      <div className="container mx-auto px-6 lg:px-12">
        <article>
          <header className="max-w-3xl mx-auto text-center mb-12">
            <Badge variant="secondary" className="mb-4">{post.category}</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">{post.title}</h1>
            <div className="text-muted-foreground flex items-center justify-center space-x-4">
              <span>By {post.author.name}</span>
              <span className="text-sm">•</span>
              <span>{post.date}</span>
              <span className="text-sm">•</span>
              <span className="flex items-center">
                <BookOpen className="w-4 h-4 mr-1.5" /> {stats.text}
              </span>
            </div>
          </header>

          <div className="mb-12">
            <Image
              src={post.imageUrl}
              alt={post.title}
              width={1200}
              height={675}
              className="object-cover w-full h-auto rounded-2xl shadow-lg max-w-5xl mx-auto"
            />
          </div>

          <div className="prose prose-xl dark:prose-invert mx-auto max-w-3xl">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>
        </article>

        <div className="mt-24 border-t border-border/50 pt-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold">More From the Blog</h2>
            <p className="text-muted-foreground mt-2">
              Explore other articles from our community. We share insights, stories, and resources to encourage you on your faith journey.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {otherPosts.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        </div>
      </div>
      <div className="mt-24">
        <NewsletterSection />
      </div>
    </div>
  );
};

export default BlogPostPage; 