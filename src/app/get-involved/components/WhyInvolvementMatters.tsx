import { Handshake, Users, Heart } from 'lucide-react';

export default function WhyInvolvementMatters() {
  const features = [
    {
      icon: Handshake,
      title: "Strength in Unity",
      description: "The church is a body of believers, and every part is essential. Your participation brings unique gifts and perspectives that enrich our entire community.",
    },
    {
      icon: Users,
      title: "Fulfilling the Great Commission",
      description: "Our mission to share the gospel is a collective effort. By getting involved, you play a direct role in reaching people with the message of hope and salvation.",
    },
    {
      icon: Heart,
      title: "A Culture of Service",
      description: "Serving others is a reflection of Christ's love. Your involvement helps us create a culture of compassion and action, both inside and outside the church walls.",
    }
  ];

  return (
    <section className="section">
      <div className="section-inner">
        <div className="text-center stack-lg mb-12">
          <div className="stack">
            <p className="eyebrow">Why It Matters</p>
            <h2 className="section-title">Why your help matters</h2>
          </div>
          <p className="section-lead max-w-3xl mx-auto">
            Every act of service, big or small, contributes to a greater purpose.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 text-center">
          {features.map((feature) => (
            <div key={feature.title} className="p-6 border border-border/40 rounded-[var(--radius)] bg-card">
              <div className="inline-flex p-3 bg-muted text-foreground rounded-[var(--radius)] mb-6">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
