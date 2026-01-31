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
    <div className="section">
      <div className="section-inner">
        <article>
          <header className="max-w-3xl mx-auto text-center stack mb-12">
            <Badge variant="secondary" className="mx-auto">
              {typeof post.category?.fields?.name === 'string' ? post.category.fields.name : 'Uncategorized'}
            </Badge>
            <h1 className="section-title">{post.title}</h1>
            <div className="text-muted-foreground flex flex-wrap items-center justify-center gap-3 text-sm">
              <span>By {typeof post.author?.fields?.name === 'string' ? post.author.fields.name : 'Christ Community Team'}</span>
              <span aria-hidden="true">•</span>
              <span>{new Date(post.publishDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
              <span aria-hidden="true">•</span>
              <span className="flex items-center gap-1.5">
                <BookOpen className="h-4 w-4" /> {stats.text}
              </span>
            </div>
          </header>

          <div className="mb-12">
            <Image
              src={post.featuredImage?.fields?.file?.url ? `https:${post.featuredImage.fields.file.url}` : '/default-blog-image.jpg'}
              alt={post.title}
              width={1200}
              height={675}
              className="object-cover w-full h-auto rounded-[var(--radius)] shadow-sm max-w-5xl mx-auto"
            />
          </div>

          <RichTextRenderer
            content={post.content}
            className="prose prose-lg dark:prose-invert mx-auto max-w-3xl"
          />
        </article>

        <div className="mt-16 border-t border-border/40 pt-12">
          <div className="text-center max-w-2xl mx-auto mb-10 stack">
            <h2 className="text-2xl font-semibold text-foreground">More From the Blog</h2>
            <p className="text-muted-foreground">
              Explore other articles from our community. We share insights, stories, and resources to encourage you on your faith journey.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
      <div className="mt-16">
        <NewsletterSection />
      </div>
    </div>
  );
};

export default BlogPostPage; 
