import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Handshake, BookOpen, Gift } from 'lucide-react';
import type { InvolvementOption } from '@/types';
import type { IInvolvementOption } from '../../../../types/contentful';

const defaultOptions: InvolvementOption[] = [
  {
    title: "Volunteer With Us",
    description: "Use your skills and passion to serve the community and support our mission.",
    href: "/get-involved/volunteer-with-us",
    icon: Handshake,
    bgColor: "bg-muted",
    textColor: "text-foreground"
  },
  {
    title: "Get a Free Bible",
    description: "Request your complimentary Bible and begin your spiritual journey today.",
    href: "/get-involved/get-a-free-bible",
    icon: Gift,
    bgColor: "bg-muted",
    textColor: "text-foreground"
  },
  {
    title: "Order a Tract",
    description: "Get equipped with beautifully designed tracts to share the gospel.",
    href: "/get-involved/order-a-tract",
    icon: BookOpen,
    bgColor: "bg-muted",
    textColor: "text-foreground"
  },

];

interface InvolvementOptionsProps {
  options?: InvolvementOption[];
  involvementOptions?: IInvolvementOption[];
}

export default function InvolvementOptions({ options = defaultOptions, involvementOptions }: InvolvementOptionsProps) {
  return (
    <section className="section" data-section="involvement-options">
      <div className="section-inner">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {options.map((option) => (
            <Card key={option.title} className="flex flex-col justify-between p-6 border-border/40 transition-all duration-300 hover:shadow-md">
              <div className="stack">
                <div className={`inline-flex p-3 rounded-[var(--radius)] ${option.bgColor}`}>
                  <option.icon className={`w-6 h-6 ${option.textColor}`} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">{option.title}</h3>
                  <p className="text-muted-foreground mt-2">{option.description}</p>
                </div>
              </div>
              <div className="mt-6">
                <Button asChild variant="outline">
                  <Link href={option.href}>
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
