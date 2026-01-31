import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Christ Community',
};

export default function BlogPage() {
  return (
    <section className="section">
      <div className="section-inner text-center">
        <div className="stack-lg">
          <div className="stack">
            <p className="eyebrow">Blog</p>
            <h1 className="section-title">This is the Blog page</h1>
          </div>
          <p className="section-lead max-w-2xl mx-auto">
            Updates and resources will be published here soon.
          </p>
        </div>
      </div>
    </section>
  );
}
