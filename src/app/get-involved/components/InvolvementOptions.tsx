import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Handshake, Heart, Map, BookOpen } from 'lucide-react';
import type { InvolvementOption } from '@/types';
import type { IInvolvementOption } from '../../../../types/contentful';

const defaultOptions: InvolvementOption[] = [
  {
    title: "Find a Church",
    description: "Connect with a local congregation and find your spiritual home.",
    href: "/get-involved/find-a-church",
    icon: Map,
    bgColor: "bg-sky-100 dark:bg-sky-950/30",
    textColor: "text-sky-600 dark:text-sky-400"
  },
  {
    title: "Volunteer With Us",
    description: "Use your skills and passion to serve the community and support our mission.",
    href: "/get-involved/volunteer-with-us",
    icon: Handshake,
    bgColor: "bg-orange-100 dark:bg-orange-950/30",
    textColor: "text-orange-600 dark:text-orange-400"
  },
  {
    title: "Order a Tract",
    description: "Get equipped with beautifully designed tracts to share the gospel.",
    href: "/get-involved/order-a-tract",
    icon: BookOpen,
    bgColor: "bg-teal-100 dark:bg-teal-950/30",
    textColor: "text-teal-600 dark:text-teal-400"
  },
  {
    title: "Send Help",
    description: "Your financial support empowers us to continue our work and expand our reach.",
    href: "/get-involved/send-help",
    icon: Heart,
    bgColor: "bg-rose-100 dark:bg-rose-950/30",
    textColor: "text-rose-600 dark:text-rose-400"
  }
];

interface InvolvementOptionsProps {
  options?: InvolvementOption[];
  involvementOptions?: IInvolvementOption[];
}

export default function InvolvementOptions({ options = defaultOptions, involvementOptions }: InvolvementOptionsProps) {
  return (
    <section className="py-24 bg-background" data-section="involvement-options">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {options.map((option) => (
            <Card key={option.title} className="group relative flex flex-col justify-between p-8 overflow-hidden rounded-2xl shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-transparent hover:border-primary/20">
              <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full transition-transform duration-500 group-hover:scale-[8] ${option.bgColor}`}></div>
              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-6">
                  <div className={`inline-flex p-4 rounded-xl mb-4 ${option.bgColor}`}>
                    <option.icon className={`w-8 h-8 ${option.textColor}`} />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">{option.title}</h3>
                  <p className="text-muted-foreground mt-2">{option.description}</p>
                </div>
                <div className="mt-auto">
                  <Button asChild variant="outline" className="bg-background/80 backdrop-blur-sm">
                    <Link href={option.href}>
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
} 