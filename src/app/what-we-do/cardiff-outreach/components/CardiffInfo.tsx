'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Heart, Users, BookOpen, Church, Globe, MessageCircle } from 'lucide-react';

export default function CardiffInfo() {
  const features = [
    {
      icon: <Heart className="h-6 w-6 text-primary" />,
      title: "Witness Christ",
      description: "Share the love of Jesus Christ through personal testimonies and the proclamation of the Gospel."
    },
    {
      icon: <MessageCircle className="h-6 w-6 text-primary" />,
      title: "Prayer & Intercession",
      description: "Join in corporate prayer for the salvation and transformation of Cardiff and Wales."
    },
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: "Unified Worship",
      description: "Experience the power of 100 believers worshipping together in the heart of the city."
    },
    {
      icon: <BookOpen className="h-6 w-6 text-primary" />,
      title: "Gospel Distribution",
      description: "Share Gospel tracts, free Bibles, and evangelistic materials with the people of Cardiff."
    },
    {
      icon: <Church className="h-6 w-6 text-primary" />,
      title: "Easter Celebration",
      description: "Celebrate the resurrection of Jesus Christ through this public demonstration of faith."
    },
    {
      icon: <Globe className="h-6 w-6 text-primary" />,
      title: "Revival Movement",
      description: "Be part of a revival moment as the Holy Spirit works through us to reach the lost."
    }
  ];

  return (
    <section className="section bg-muted/20">
      <div className="section-inner">
        <div className="text-center stack-lg mb-12">
          <div className="stack">
            <p className="eyebrow">Easter 2026</p>
            <h2 className="section-title">About the Outreach</h2>
          </div>
          <p className="section-lead max-w-3xl mx-auto">
            A powerful evangelism outreach to spread the Gospel through the work of the Holy Spirit during Easter 2026.
          </p>
        </div>

        <div className="bg-card border border-border/40 rounded-[var(--radius)] p-8 lg:p-12 mb-12">
          <div className="stack text-muted-foreground">
            <p>
              This is an evangelism outreach to Cardiff City Center, where we have a target of 100 believers
              to witness Christ, pray, and worship at the Cardiff City Center. During this Easter, we want to
              spread the Gospel through the work of the Holy Spirit in us.
            </p>
            <p>
              This outreach is a demonstration of our faith and commitment to the Great Commission. As believers
              unite in Cardiff, we will witness to the power of Christ&apos;s resurrection, pray for the city, and
              worship our Lord in public. We believe that through the Holy Spirit, hearts will be touched,
              lives will be transformed, and the Kingdom of God will advance in Wales.
            </p>
            <p>
              Whether you&apos;re sharing your testimony, distributing Gospel literature, praying for strangers,
              or simply being a visible witness to the love of Christ, your participation matters. Together,
              we will create a powerful moment of revival in the heart of Cardiff.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="border-border/40 shadow-sm">
              <CardContent className="p-8 text-center stack">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-background border border-border/40 rounded-[var(--radius)] p-8 lg:p-12 mb-12">
          <h3 className="text-2xl font-semibold text-foreground mb-4">
            What to Expect
          </h3>
          <ul className="grid gap-3 text-muted-foreground">
            <li className="flex items-start gap-3">
              <span className="text-primary text-lg">✓</span>
              <span>Gathering and prayer session before heading to Cardiff City Center</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-lg">✓</span>
              <span>Coordinated witness activities throughout the city center</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-lg">✓</span>
              <span>Public worship and praise sessions</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-lg">✓</span>
              <span>Distribution of Gospel materials and free Bibles</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-lg">✓</span>
              <span>Fellowship and encouragement with fellow believers</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-lg">✓</span>
              <span>Closing prayer and celebration of the day&apos;s impact</span>
            </li>
          </ul>
        </div>

        <div className="bg-muted/30 border border-border/40 rounded-[var(--radius)] p-8 lg:p-12">
          <h3 className="text-2xl font-semibold text-foreground mb-4">
            Why Join Us?
          </h3>
          <div className="stack text-muted-foreground">
            <p>
              Easter is the celebration of the resurrection of Jesus Christ - the cornerstone of our faith.
              This outreach is an opportunity to share the hope of the Gospel with those who need it most.
            </p>
            <p>
              By joining 100 believers in Cardiff, you&apos;re not just participating in an event - you&apos;re being
              obedient to the Great Commission. You&apos;re stepping out in faith, trusting the Holy Spirit to
              work through you to bring the message of salvation to Cardiff.
            </p>
            <p>
              This is a revival moment. This is where the Church comes together, breaks down denominational
              walls, and unites in the mission of soul winning. Your presence matters. Your witness matters.
              Your prayers matter.
            </p>
            <p className="font-semibold text-foreground">
              Sign up today and be part of this historic outreach. Let&apos;s reach Cardiff for Christ this Easter!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
