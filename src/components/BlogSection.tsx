import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const blogPosts = [
  {
    id: 1,
    title: 'Focus is everything',
    excerpt: 'Over the years, we have kept our focus on developing revolutionary and economical products for the Church, but have garnered the attention of other industries seeking powerful, stable, and affordable media solutions. As such.',
    imageUrl: '/Church-Conference.jpg',
    href: '/blog/focus-is-everything',
  },
  {
    id: 2,
    title: 'The power of impact',
    excerpt: 'Out of this knowledge and hands-on experience, Renewed Vision continues to develop ProPresenter, ProVideoPlayer, ProVideoServer, and ProPresenter® Scoreboard. We have witnessed first hand the impact of enhanced.',
    imageUrl: '/worship-conference.jpeg',
    href: '/blog/power-of-impact',
  },
];

const BlogSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            Our collective insights are driven by experience but fueled by passion.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {blogPosts.map((post) => (
            <div key={post.id} className="group">
                <div className="overflow-hidden rounded-2xl mb-8 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    width={800}
                    height={600}
                    className="object-cover w-full h-auto aspect-[4/3] group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                  {post.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {post.excerpt}
                </p>
                <Link href={post.href} className="font-semibold text-blue-600 hover:underline">
                    Read More
                </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection; 