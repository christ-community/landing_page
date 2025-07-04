'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Calendar, 
  Users, 
  Computer, 
  Palette, 
  Building,
  MapPin,
  Clock,
  Star,
  ArrowRight,
  Filter
} from 'lucide-react';
import type { VolunteerOpportunity } from '@/types';

interface VolunteerOpportunitiesProps {
  title?: string;
  subtitle?: string;
  opportunities?: VolunteerOpportunity[];
}

// Sample volunteer opportunities data
const defaultOpportunities: VolunteerOpportunity[] = [
  {
    id: '1',
    title: 'Community Outreach Coordinator',
    description: 'Help organize and lead community events, food drives, and outreach programs. Connect with local families and coordinate volunteer teams.',
    shortDescription: 'Lead community events and outreach programs',
    icon: <Heart className="w-6 h-6" />,
    timeCommitment: '4-6 hours/week',
    location: 'onsite',
    skillLevel: 'intermediate',
    category: 'outreach',
    requirements: ['Good communication skills', 'Leadership experience', 'Reliable transportation'],
    benefits: ['Leadership development', 'Community impact', 'Networking opportunities'],
    tags: ['Leadership', 'Community', 'Events'],
    isPopular: true
  },
  {
    id: '2',
    title: 'Children\'s Ministry Assistant',
    description: 'Support Sunday school teachers, help with crafts and activities, and create a safe, fun environment for children to learn and grow.',
    shortDescription: 'Support children\'s programs and activities',
    icon: <Users className="w-6 h-6" />,
    timeCommitment: '2-3 hours/week',
    location: 'onsite',
    skillLevel: 'any',
    category: 'ministry',
    requirements: ['Love for children', 'Patience', 'Background check'],
    benefits: ['Work with kids', 'Flexible schedule', 'Training provided'],
    tags: ['Children', 'Teaching', 'Fun'],
    isPopular: true
  },
  {
    id: '3',
    title: 'Event Planning Team',
    description: 'Plan and coordinate special events, conferences, and community gatherings. Handle logistics, vendor coordination, and volunteer management.',
    shortDescription: 'Plan and coordinate special events',
    icon: <Calendar className="w-6 h-6" />,
    timeCommitment: '5-8 hours/week',
    location: 'hybrid',
    skillLevel: 'intermediate',
    category: 'events',
    requirements: ['Organizational skills', 'Attention to detail', 'Event planning experience'],
    benefits: ['Event management experience', 'Creative outlet', 'Team collaboration'],
    tags: ['Planning', 'Organization', 'Creative'],
    isUrgent: true
  },
  {
    id: '4',
    title: 'Tech Support Volunteer',
    description: 'Help maintain website, manage social media, assist with live streaming, and provide technical support for church services.',
    shortDescription: 'Provide technical support and digital assistance',
    icon: <Computer className="w-6 h-6" />,
    timeCommitment: '3-4 hours/week',
    location: 'remote',
    skillLevel: 'intermediate',
    category: 'technology',
    requirements: ['Basic tech skills', 'Problem-solving ability', 'Reliable internet'],
    benefits: ['Skill development', 'Remote flexibility', 'Tech experience'],
    tags: ['Technology', 'Remote', 'Support']
  },
  {
    id: '5',
    title: 'Creative Arts Team',
    description: 'Design graphics, create promotional materials, assist with photography, and help with visual storytelling for various programs.',
    shortDescription: 'Create visual content and promotional materials',
    icon: <Palette className="w-6 h-6" />,
    timeCommitment: '2-4 hours/week',
    location: 'remote',
    skillLevel: 'intermediate',
    category: 'creative',
    requirements: ['Design software knowledge', 'Creative eye', 'Portfolio examples'],
    benefits: ['Portfolio building', 'Creative freedom', 'Skill development'],
    tags: ['Design', 'Creative', 'Visual']
  },
  {
    id: '6',
    title: 'Administrative Assistant',
    description: 'Support office operations, help with data entry, answer phones, and assist with general administrative tasks.',
    shortDescription: 'Support daily office operations and administration',
    icon: <Building className="w-6 h-6" />,
    timeCommitment: '4-6 hours/week',
    location: 'onsite',
    skillLevel: 'beginner',
    category: 'administration',
    requirements: ['Basic computer skills', 'Good communication', 'Reliable schedule'],
    benefits: ['Office experience', 'Skill development', 'Professional references'],
    tags: ['Administration', 'Office', 'Support']
  }
];

const categories = [
  { id: 'all', label: 'All Opportunities', icon: Star },
  { id: 'ministry', label: 'Ministry', icon: Heart },
  { id: 'events', label: 'Events', icon: Calendar },
  { id: 'outreach', label: 'Outreach', icon: Users },
  { id: 'technology', label: 'Technology', icon: Computer },
  { id: 'creative', label: 'Creative', icon: Palette },
  { id: 'administration', label: 'Administration', icon: Building }
];

const locationColors = {
  remote: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  onsite: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  hybrid: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
};

export default function VolunteerOpportunities({
  title = "Volunteer Opportunities",
  subtitle = "Find the perfect way to make a difference with your unique skills and interests",
  opportunities = defaultOpportunities
}: VolunteerOpportunitiesProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAll, setShowAll] = useState(false);

  const filteredOpportunities = selectedCategory === 'all' 
    ? opportunities 
    : opportunities.filter(opp => opp.category === selectedCategory);

  const displayedOpportunities = showAll 
    ? filteredOpportunities 
    : filteredOpportunities.slice(0, 6);

  return (
    <section className="py-20 bg-background" data-section="volunteer-opportunities">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="mb-12 grid lg:grid-cols-2 gap-8 items-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight text-foreground">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl">
            {subtitle}
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className={`rounded-lg px-6 py-2 transition-all duration-300 ${
                selectedCategory === category.id 
                  ? 'bg-tertiary text-tertiary-foreground hover:bg-tertiary/90' 
                  : 'border-border/20 text-foreground hover:bg-tertiary/10 hover:border-tertiary/40'
              }`}
            >
              <category.icon className="w-4 h-4 mr-2" />
              {category.label}
            </Button>
          ))}
        </div>

        {/* Opportunities Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
          {displayedOpportunities.map((opportunity) => (
            <Card key={opportunity.id} className="group relative overflow-hidden border border-border/10 bg-card p-6 transition-all duration-300 hover:border-tertiary/40 hover:shadow-lg rounded-xl">
              <CardHeader className="pb-4 p-0">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-tertiary/10 rounded-lg">
                    {opportunity.icon}
                  </div>
                  <div className="flex flex-col gap-2">
                    {opportunity.isPopular && (
                      <Badge className="bg-tertiary/20 text-tertiary">
                        <Star className="w-3 h-3 mr-1" />
                        Popular
                      </Badge>
                    )}
                    {opportunity.isUrgent && (
                      <Badge className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300">
                        Urgent
                      </Badge>
                    )}
                  </div>
                </div>
                
                <CardTitle className="text-xl font-semibold text-foreground group-hover:text-tertiary transition-colors line-clamp-2 mb-4">
                  {opportunity.title}
                </CardTitle>
                
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {opportunity.description}
                </p>
              </CardHeader>

              <CardContent className="space-y-4 p-0">
                {/* Details */}
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 mr-2 text-tertiary" />
                    {opportunity.timeCommitment}
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin className="w-4 h-4 mr-2 text-tertiary" />
                    <Badge variant="secondary" className={locationColors[opportunity.location]}>
                      {opportunity.location.charAt(0).toUpperCase() + opportunity.location.slice(1)}
                    </Badge>
                  </div>
                </div>

                {/* Tags */}
                {opportunity.tags && (
                  <div className="flex flex-wrap gap-1">
                    {opportunity.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-border/20">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Action Button */}
                <Button className="w-full mt-4 bg-tertiary hover:bg-tertiary/90 text-tertiary-foreground">
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Show More/Less Button */}
        {filteredOpportunities.length > 6 && (
          <div className="text-center">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowAll(!showAll)}
              className="border-2 border-tertiary/20 text-foreground hover:bg-tertiary/10 hover:border-tertiary/40 px-8"
            >
              <Filter className="w-5 h-5 mr-2" />
              {showAll ? 'Show Less' : `Show All ${filteredOpportunities.length} Opportunities`}
            </Button>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16 p-8 bg-card border border-border/10 rounded-xl">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Don't See the Perfect Fit?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            We're always looking for passionate volunteers with unique skills. Contact us to discuss how your talents can make a difference.
          </p>
          <Button className="bg-tertiary hover:bg-tertiary/90 text-tertiary-foreground px-8">
            Contact Our Volunteer Coordinator
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
} 