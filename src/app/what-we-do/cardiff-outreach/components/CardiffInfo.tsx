'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Heart, Users, BookOpen, Church, Globe, MessageCircle } from 'lucide-react';

export default function CardiffInfo() {
  const features = [
    {
      icon: <Heart className="w-8 h-8 text-tertiary" />,
      title: "Witness Christ",
      description: "Share the love of Jesus Christ through personal testimonies and the proclamation of the Gospel."
    },
    {
      icon: <MessageCircle className="w-8 h-8 text-red-600" />,
      title: "Prayer & Intercession",
      description: "Join in corporate prayer for the salvation and transformation of Cardiff and Wales."
    },
    {
      icon: <Users className="w-8 h-8 text-red-700" />,
      title: "Unified Worship",
      description: "Experience the power of 100 believers worshipping together in the heart of the city."
    },
    {
      icon: <BookOpen className="w-8 h-8 text-tertiary" />,
      title: "Gospel Distribution",
      description: "Share Gospel tracts, free Bibles, and evangelistic materials with the people of Cardiff."
    },
    {
      icon: <Church className="w-8 h-8 text-red-600" />,
      title: "Easter Celebration",
      description: "Celebrate the resurrection of Jesus Christ through this public demonstration of faith."
    },
    {
      icon: <Globe className="w-8 h-8 text-red-700" />,
      title: "Revival Movement",
      description: "Be part of a revival moment as the Holy Spirit works through us to reach the lost."
    }
  ];

  return (
    <section className="py-24 bg-muted/40">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            About The Outreach
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A powerful evangelism outreach to spread the Gospel through the work of the Holy Spirit during Easter 2026.
          </p>
        </div>

        <div className="bg-gradient-to-br from-tertiary/10 to-red-50 dark:from-tertiary/20 dark:to-red-950/30 rounded-3xl p-8 lg:p-12 mb-16">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-muted-foreground leading-relaxed mb-6">
              This is an evangelism outreach to Cardiff City Center, where we have a target of 100 believers 
              to witness Christ, pray, and worship at the Cardiff City Center. During this Easter, we want to 
              spread the Gospel through the work of the Holy Spirit in us.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              This outreach is a demonstration of our faith and commitment to the Great Commission. As believers 
              unite in Cardiff, we will witness to the power of Christ&apos;s resurrection, pray for the city, and 
              worship our Lord in public. We believe that through the Holy Spirit, hearts will be touched, 
              lives will be transformed, and the Kingdom of God will advance in Wales.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Whether you&apos;re sharing your testimony, distributing Gospel literature, praying for strangers, 
              or simply being a visible witness to the love of Christ, your participation matters. Together, 
              we will create a powerful moment of revival in the heart of Cardiff.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card border border-border/10 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="mb-6 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-r from-tertiary/10 to-red-50 dark:from-tertiary/20 dark:to-red-950/30 rounded-3xl p-8 lg:p-12 mb-16">
          <h3 className="text-3xl font-bold text-foreground mb-6">
            What to Expect
          </h3>
          <ul className="space-y-4 text-muted-foreground">
            <li className="flex items-start">
              <span className="text-tertiary mr-3 text-xl">✓</span>
              <span>Gathering and prayer session before heading to Cardiff City Center</span>
            </li>
            <li className="flex items-start">
              <span className="text-tertiary mr-3 text-xl">✓</span>
              <span>Coordinated witness activities throughout the city center</span>
            </li>
            <li className="flex items-start">
              <span className="text-tertiary mr-3 text-xl">✓</span>
              <span>Public worship and praise sessions</span>
            </li>
            <li className="flex items-start">
              <span className="text-tertiary mr-3 text-xl">✓</span>
              <span>Distribution of Gospel materials and free Bibles</span>
            </li>
            <li className="flex items-start">
              <span className="text-tertiary mr-3 text-xl">✓</span>
              <span>Fellowship and encouragement with fellow believers</span>
            </li>
            <li className="flex items-start">
              <span className="text-tertiary mr-3 text-xl">✓</span>
              <span>Closing prayer and celebration of the day&apos;s impact</span>
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-r from-red-50 to-tertiary/10 dark:from-red-950/30 dark:to-tertiary/20 rounded-3xl p-8 lg:p-12">
          <h3 className="text-3xl font-bold text-foreground mb-6">
            Why Join Us?
          </h3>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
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
