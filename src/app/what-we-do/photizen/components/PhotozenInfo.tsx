'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Users, MessageCircle, Music, Heart, Church, Globe } from 'lucide-react';

export default function PhotozenInfo() {
  const features = [
    {
      icon: <Users className="w-6 h-6 text-foreground" />,
      title: "Panel Session",
      description: "Leaders and representatives from up to 6 churches and 2 student Christian associations sharing wisdom and insights."
    },
    {
      icon: <Music className="w-6 h-6 text-foreground" />,
      title: "Joint Choir Ministration",
      description: "Experience powerful worship as churches come together in unified praise and celebration."
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-foreground" />,
      title: "Prayer & Networking",
      description: "Join in corporate prayer for the salvation of the region and connect with fellow believers."
    },
    {
      icon: <Heart className="w-6 h-6 text-foreground" />,
      title: "Interdenominational Unity",
      description: "Promoting collaboration and cooperation among churches across South Wales."
    },
    {
      icon: <Church className="w-6 h-6 text-foreground" />,
      title: "Intergenerational Transfer",
      description: "Pivotal opportunity for wisdom and knowledge transfer from older to newer generations."
    },
    {
      icon: <Globe className="w-6 h-6 text-foreground" />,
      title: "Regional Impact",
      description: "Working together to foster the spread of the gospel in Wales and the United Kingdom."
    }
  ];

  return (
    <section className="section bg-muted/20">
      <div className="section-inner">
        <div className="text-center stack-lg mb-12">
          <div className="stack">
            <p className="eyebrow">Conference</p>
            <h2 className="section-title">About The Conference</h2>
          </div>
          <p className="section-lead max-w-3xl mx-auto">
            There&apos;s no big church and there&apos;s no small church. But there&apos;s a <strong>Big Church</strong> when we come together:
            The commonwealth of Zion, the church of the Most High.
          </p>
        </div>

        <div className="bg-muted/30 rounded-[var(--radius)] p-8 lg:p-12 mb-12">
          <div className="max-w-none">
            <p className="text-muted-foreground leading-relaxed mb-6">
              The Big Church Conference is the gathering of Christians from different denominations in South Wales 
              to meet and pray together for the salvation of the region, to promote interdenominational collaboration 
              and explore various ways we can work together to foster the spread of the gospel in Wales and the United Kingdom.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              This Conference is also pivotal to intergenerational transfer of knowledge and wisdom from the 
              older generation to the new. The conference will employ prayer, joint choir ministration, a panel 
              session consisting of various church leaders, question and answer session, networking, and meet 
              and greet to achieve the objective of fostering interdenominational cooperation among Christians 
              in South Wales.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card border border-border/40 rounded-[var(--radius)] shadow-sm">
              <CardContent className="p-6 text-center">
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

        <div className="bg-muted/30 rounded-[var(--radius)] p-8 lg:p-12">
          <h3 className="text-2xl font-semibold text-foreground mb-6">
            Who We Are
          </h3>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              The Big Church Conference Swansea is organised by <strong>Christ Community Global</strong>. 
              We are an interdenominational Christian organisation with the goal of promoting interdenominational 
              activities to advance the course of the Gospel in the United Kingdom and the World at large.
            </p>
            <p>
              We believe in a united body of Christ, as the scripture says in Ephesians 4:4-5: 
              <em className="block mt-2 pl-4 border-l-4 border-primary italic">
                &quot;There is one body and one Spirit, just as you were called to one hope when you were called; 
                one Lord, one faith, one baptism; one God and Father of all, who is over all and through all 
                and in all.&quot;
              </em>
            </p>
            <p>
              We believe that denomination is not an excuse for disunity. In the past year we have organised 
              interdenominational missions which include <strong>10 Welsh Cities for Christ</strong>, where we 
              took the gospel across cities and towns in Wales.
            </p>
            <p>
              Christ Community also runs other missions and meetings which includes intercessory prayers for 
              soul winning in Wales, Free Bible Project, and Mission aid for Independent Missionaries across 
              the World. For more information about Christ Community, kindly visit{' '}
              <a href="https://christcommunityglobal.org" target="_blank" rel="noopener noreferrer" className="text-foreground underline">
                Christcommunityglobal.org
              </a>
            </p>
          </div>
        </div>

        <div className="mt-12 bg-muted/30 rounded-[var(--radius)] p-8 lg:p-12">
          <h3 className="text-2xl font-semibold text-foreground mb-6">
            Benefits to You
          </h3>
          <ul className="space-y-4 text-muted-foreground">
            <li className="flex items-start">
              <span className="text-primary mr-3 text-xl">✓</span>
              <span>Opportunity to connect and learn from leaders in different ministries</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3 text-xl">✓</span>
              <span>Opportunity to share God&apos;s revelation and vision with other believers to advance the Gospel</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3 text-xl">✓</span>
              <span>Opportunity to connect with Christian student associations</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3 text-xl">✓</span>
              <span>Experience the power of unified worship and intercession with believers from diverse backgrounds</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3 text-xl">✓</span>
              <span>Most importantly, you&apos;ll be obeying God by playing a great part in fostering the unity of believers in South Wales</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
