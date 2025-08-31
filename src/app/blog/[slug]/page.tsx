import 'server-only';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import readingTime from 'reading-time';
import { getBlogPost, getBlogPosts } from '../../../../lib/contentful-api';
import { Badge } from '@/components/ui/badge';
import PostCard from '../components/PostCard';
import NewsletterSection from '@/components/NewsletterSection';
import RichTextRenderer from '@/components/RichTextRenderer';
import { extractTextFromRichText } from '@/utils/richTextUtils';
import { BookOpen } from 'lucide-react';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const BlogPostPage = async ({ params }: BlogPostPageProps) => {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post || !post.content) {
    notFound();
  }

  // Extract text from rich text for reading time calculation
  const contentText = extractTextFromRichText(post.content);
  const stats = readingTime(contentText);
  
  // Get other posts for recommendations
  const allPosts = await getBlogPosts({ limit: 10 });
  const otherPosts = allPosts.filter((p: any) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="py-24">
      <div className="container mx-auto px-6 lg:px-12">
        <article>
          <header className="max-w-3xl mx-auto text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              {typeof post.category?.fields?.name === 'string' ? post.category.fields.name : 'Uncategorized'}
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">{post.title}</h1>
            <div className="text-muted-foreground flex items-center justify-center space-x-4">
              <span>By {typeof post.author?.fields?.name === 'string' ? post.author.fields.name : 'Christ Community Team'}</span>
              <span className="text-sm">•</span>
              <span>{new Date(post.publishDate).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
              <span className="text-sm">•</span>
              <span className="flex items-center">
                <BookOpen className="w-4 h-4 mr-1.5" /> {stats.text}
              </span>
            </div>
          </header>

          <div className="mb-12">
            <Image
              src={post.featuredImage?.fields?.file?.url ? `https:${post.featuredImage.fields.file.url}` : '/default-blog-image.jpg'}
              alt={post.title}
              width={1200}
              height={675}
              className="object-cover w-full h-auto rounded-2xl shadow-lg max-w-5xl mx-auto"
            />
          </div>

          <RichTextRenderer 
            content={post.content}
            className="prose prose-xl dark:prose-invert mx-auto max-w-3xl"
          />
        </article>

        <div className="mt-24 border-t border-border/50 pt-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold">More From the Blog</h2>
            <p className="text-muted-foreground mt-2">
              Explore other articles from our community. We share insights, stories, and resources to encourage you on your faith journey.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {otherPosts.map((p: any) => {
              const transformedPost = {
                ...p,
                href: `/blog/${p.slug}`,
                imageUrl: p.featuredImage?.fields?.file?.url ? `https:${p.featuredImage.fields.file.url}` : '/default-blog-image.jpg',
                author: typeof p.author?.fields?.name === 'string' ? { name: p.author.fields.name } : { name: 'Christ Community Team' },
                date: new Date(p.publishDate).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                }),
                category: typeof p.category?.fields?.name === 'string' ? p.category.fields.name : 'Uncategorized'
              };
              return <PostCard key={p.id || p.sys?.id} post={transformedPost} />;
            })}
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