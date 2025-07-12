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
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
            Why Your Help Matters
          </h2>
          <p className="text-xl text-muted-foreground mt-4 max-w-3xl mx-auto">
            Every act of service, big or small, contributes to a greater purpose.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {features.map((feature) => (
            <div key={feature.title} className="p-8 border border-border/10 rounded-xl bg-card">
              <div className="inline-flex p-4 bg-red-100 dark:bg-red-950/30 text-red-600 dark:text-red-400 rounded-full mb-6">
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 