'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Cross, 
  Heart, 
  Users, 
  Globe, 
  Crown,
  Bird,
  Church,
  ArrowRight,
  Quote
} from 'lucide-react';
import Link from 'next/link';
import type { ICoreBelief } from '../../../../../types/contentful';

interface Belief {
  title: string;
  icon: any;
  description: string;
  scripture: string;
  details: string;
  color: string;
}

const coreBeliefs: Belief[] = [
  {
    title: "The Authority of Scripture",
    icon: BookOpen,
    description: "We believe the Bible is the inspired, infallible Word of God and our ultimate authority for faith and life.",
    scripture: "2 Timothy 3:16-17",
    details: "The Scriptures are our foundation for understanding God's will, His character, and His plan for humanity. We are committed to teaching and living by biblical truth.",
    color: "text-primary"
  },
  {
    title: "The Trinity",
    icon: Crown,
    description: "We worship one God who eternally exists in three persons: Father, Son, and Holy Spirit.",
    scripture: "Matthew 28:19",
    details: "Each person of the Trinity is fully God, yet there is one God. This mystery is central to our understanding of God's nature and our relationship with Him.",
    color: "text-primary"
  },
  {
    title: "Salvation by Grace",
    icon: Cross,
    description: "We believe salvation is a gift from God through faith in Jesus Christ, not by our own works.",
    scripture: "Ephesians 2:8-9",
    details: "Jesus Christ died on the cross for our sins and rose from the dead, providing the only way to eternal life. This gift is received through faith alone.",
    color: "text-primary"
  },
  {
    title: "The Church Community",
    icon: Church,
    description: "We believe the church is the body of Christ, called to worship, fellowship, discipleship, and mission.",
    scripture: "1 Corinthians 12:27",
    details: "Every believer is part of God's family and has a role to play in the mission of the church. We are stronger together than apart.",
    color: "text-primary"
  },
  {
    title: "The Holy Spirit",
    icon: Bird,
    description: "We believe the Holy Spirit indwells every believer, providing guidance, comfort, and power for Christian living.",
    scripture: "John 14:26",
    details: "The Spirit empowers us for ministry, transforms our character, and helps us understand God's truth. He is our constant companion and guide.",
    color: "text-primary"
  },
  {
    title: "The Great Commission",
    icon: Globe,
    description: "We are called to make disciples of all nations, sharing the Gospel both locally and globally.",
    scripture: "Matthew 28:19-20",
    details: "Every Christian is called to participate in God's mission to reach the world. This drives our evangelism, missions, and community outreach efforts.",
    color: "text-primary"
  }
];

const statementOfFaith = [
  {
    category: "God",
    statement: "We believe in one God, eternally existent in three persons: Father, Son, and Holy Spirit, each divine yet one God."
  },
  {
    category: "Jesus Christ",
    statement: "We believe Jesus Christ is fully God and fully man, born of a virgin, lived a sinless life, died for our sins, and rose from the dead."
  },
  {
    category: "Holy Spirit",
    statement: "We believe the Holy Spirit convicts of sin, regenerates the believer, and indwells, guides, and empowers the Christian for godly living."
  },
  {
    category: "Scripture",
    statement: "We believe the Bible is the inspired, inerrant Word of God and is the complete revelation of His will for salvation and godly living."
  },
  {
    category: "Salvation",
    statement: "We believe salvation is by grace through faith in Jesus Christ alone, not by works, and results in eternal life."
  },
  {
    category: "The Church",
    statement: "We believe the church is the body of Christ, made up of all believers, called to worship, fellowship, discipleship, and evangelism."
  }
];

interface CoreBeliefsProps {
  coreBeliefs?: ICoreBelief[];
}

export default function CoreBeliefs({ coreBeliefs: contentfulBeliefs }: CoreBeliefsProps) {
  // Use Contentful beliefs if available, otherwise use hardcoded ones
  const beliefsToUse = contentfulBeliefs && contentfulBeliefs.length > 0 
    ? contentfulBeliefs.map(belief => ({
        title: belief.title,
        icon: BookOpen,
        description: belief.description,
        scripture: belief.scriptureReference || '',
        details: belief.description,
        color: 'text-foreground'
      }))
    : coreBeliefs;

  return (
    <section className="section">
      <div className="section-inner">
        <div className="text-center stack-lg mb-12">
          <div className="stack">
            <p className="eyebrow">Beliefs</p>
            <h2 className="section-title">What We Believe</h2>
          </div>
          <p className="section-lead max-w-3xl mx-auto">
            Our beliefs are firmly rooted in biblical truth and have guided our community for generations.
            These core convictions shape everything we do and teach.
          </p>
        </div>

        {/* Core Beliefs Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {beliefsToUse.map((belief, index) => {
            const Icon = belief.icon;
            return (
              <Card key={index} className="border border-border/40 transition-all duration-300 hover:shadow-md h-full">
                <CardHeader className="text-center pb-4">
                  <div className="inline-flex p-3 rounded-[var(--radius)] bg-muted mb-4">
                    <Icon className={`w-6 h-6 ${belief.color}`} />
                  </div>
                  <CardTitle className="text-xl font-semibold">{belief.title}</CardTitle>
                  <p className="text-sm font-medium text-muted-foreground">{belief.scripture}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {belief.description}
                  </p>
                  <div className="p-4 bg-muted/30 rounded-[var(--radius)] border border-border/40">
                    <p className="text-sm text-muted-foreground italic">
                      {belief.details}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Statement of Faith */}
        <div className="bg-muted/30 rounded-[var(--radius)] p-8 md:p-12 mb-12">
          <div className="text-center stack-lg mb-8">
            <div className="stack">
              <p className="eyebrow">Statement of Faith</p>
              <h3 className="text-2xl font-semibold text-foreground">Our Statement of Faith</h3>
            </div>
            <p className="section-lead max-w-2xl mx-auto">
              These fundamental truths form the foundation of our teaching and ministry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {statementOfFaith.map((item, index) => (
              <div key={index} className="bg-background/60 p-6 rounded-[var(--radius)] border border-border/40">
                <div className="flex items-start gap-3">
                  <Quote className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{item.category}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.statement}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          <Card className="border border-border/40">
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-[var(--radius)] bg-muted">
                  <Heart className="w-6 h-6 text-foreground" />
                </div>
                <CardTitle className="text-2xl">Our Mission</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed mb-4">
                To know Christ and make Him known by creating a community where people can 
                encounter God's love, grow in their faith, and serve others with compassion.
              </p>
              <p className="text-sm text-muted-foreground italic">
                "Therefore go and make disciples of all nations..." - Matthew 28:19
              </p>
            </CardContent>
          </Card>

          <Card className="border border-border/40">
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-[var(--radius)] bg-muted">
                  <Globe className="w-6 h-6 text-foreground" />
                </div>
                <CardTitle className="text-2xl">Our Vision</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed mb-4">
                To be a church that transforms lives and communities through the power of 
                the Gospel, both locally and around the world.
              </p>
              <p className="text-sm text-muted-foreground italic">
                "For we are God's handiwork, created in Christ Jesus to do good works..." - Ephesians 2:10
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-muted/30 rounded-[var(--radius)] p-8 md:p-12">
          <h3 className="text-2xl font-semibold text-foreground mb-4">
            Questions About Our Beliefs?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            We'd love to discuss our faith with you. Whether you're exploring Christianity or 
            want to understand our specific beliefs, our pastoral team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg">
                <BookOpen className="w-5 h-5 mr-2" />
                Ask Questions
              </Button>
            </Link>
            <Link href="/what-we-do/blog">
              <Button size="lg" variant="outline">
                Read Our Teachings
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
