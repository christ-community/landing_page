'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Users, MessageCircle, Music, Heart, Church, Globe } from 'lucide-react';

export default function PhotozenInfo() {
  const features = [
    {
      icon: <Users className="w-8 h-8 text-blue-500" />,
      title: "Panel Session",
      description: "Leaders and representatives from up to 6 faith communities and 2 student Christian associations sharing wisdom and insights."
    },
    {
      icon: <Music className="w-8 h-8 text-purple-500" />,
      title: "Joint Choir Ministration",
      description: "Experience powerful worship as faith communities come together in unified praise and celebration."
    },
    {
      icon: <MessageCircle className="w-8 h-8 text-green-500" />,
      title: "Prayer & Networking",
      description: "Join in corporate prayer for the salvation of the region and connect with fellow believers."
    },
    {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      title: "Interdenominational Unity",
      description: "Promoting collaboration and cooperation among faith communities across South Wales."
    },
    {
      icon: <Church className="w-8 h-8 text-indigo-500" />,
      title: "Intergenerational Transfer",
      description: "Pivotal opportunity for wisdom and knowledge transfer from older to newer generations."
    },
    {
      icon: <Globe className="w-8 h-8 text-orange-500" />,
      title: "Regional Impact",
      description: "Working together to foster the spread of the gospel in Wales and the United Kingdom."
    }
  ];

  return (
    <section className="py-24 bg-muted/40">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            About The Conference
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            There's no big congregation and there's no small congregation. But there's a <strong>Big Community</strong> when we come together: 
            The commonwealth of Zion, the people of the Most High.
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-3xl p-8 lg:p-12 mb-16">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-muted-foreground leading-relaxed mb-6">
              The Big Community Conference is a gathering of faith communities in South Wales to meet and pray together for 
              the salvation of the region, to promote interdenominational collaboration and explore various ways 
              we can work together to foster the spread of the gospel in Wales and the United Kingdom.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              This Conference is also pivotal to intergenerational transfer of knowledge and wisdom from the 
              older generation to the new. The conference will employ prayer, joint choir ministration, a panel 
              session consisting of various ministry leaders, question and answer session, networking, and meet 
              and greet to achieve the objective of fostering interdenominational cooperation among faith communities 
              in South Wales.
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

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-3xl p-8 lg:p-12">
          <h3 className="text-3xl font-bold text-foreground mb-6">
            Who We Are
          </h3>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              The Big Community Conference Swansea is organised by <strong>Christ Community Global</strong>. 
              We are an interdenominational Christian organisation with the goal of promoting interdenominational 
              activities to advance the course of the Gospel in the United Kingdom and the World at large.
            </p>
            <p>
              We believe in a united body of Christ, as the scripture says in Ephesians 4:4-5: 
              <em className="block mt-2 pl-4 border-l-4 border-blue-500 italic">
                "There is one body and one Spirit, just as you were called to one hope when you were called; 
                one Lord, one faith, one baptism; one God and Father of all, who is over all and through all 
                and in all."
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
              <a href="https://christcommunityglobal.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 underline">
                Christcommunityglobal.org
              </a>
            </p>
          </div>
        </div>

        <div className="mt-16 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30 rounded-3xl p-8 lg:p-12">
          <h3 className="text-3xl font-bold text-foreground mb-6">
            Benefits to Your Ministry
          </h3>
          <ul className="space-y-4 text-muted-foreground">
            <li className="flex items-start">
              <span className="text-blue-600 mr-3 text-xl">✓</span>
              <span>Opportunity to connect and learn from leaders in other ministries</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-3 text-xl">✓</span>
              <span>Opportunity to share God's revelation and vision for your ministry with other faith communities to advance the Gospel</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-3 text-xl">✓</span>
              <span>Opportunity to connect with Christian student associations</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-3 text-xl">✓</span>
              <span>Be part of the first faith communities onboarded on our Find a Faith Community technology to be deployed on our website</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-3 text-xl">✓</span>
              <span>Most importantly, you'll be obeying God by playing a great part in fostering the unity of the body of Christ in South Wales</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
