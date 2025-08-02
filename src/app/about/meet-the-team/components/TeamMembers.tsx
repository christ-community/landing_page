'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Mail, 
  Phone, 
  Calendar, 
  Users, 
  BookOpen, 
  Heart,
  Handshake,
  Star
} from 'lucide-react';
import type { ITeamMember } from '../../../../../types/contentful';
import { processAsset } from '@/lib/contentful-utils';

interface TeamMembersProps {
  teamMembers: ITeamMember[];
}

const getDepartmentColor = (department: string) => {
  const colorMap: { [key: string]: string } = {
    'Leadership': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
    'Ministry': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    'Youth & Family': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    'Creative Arts': 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300',
    'Family Ministry': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
    'Global Outreach': 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300',
  };
  return colorMap[department] || 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300';
};

export default function TeamMembers({ teamMembers }: TeamMembersProps) {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our Leadership Team
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Each member of our team brings unique gifts, experience, and passion to serve our community. 
            Together, we're committed to shepherding, teaching, and supporting our congregation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <Card key={index} className="border-2 border-border/10 hover:border-primary/30 hover:shadow-lg transition-all duration-300 group">
              <CardHeader className="text-center pb-4">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary/20 to-tertiary/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform overflow-hidden">
                  {member.profileImage ? (
                    <Image
                      src={processAsset(member.profileImage) || '/Church-Conference.jpg'}
                      alt={member.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <Users className="w-12 h-12 text-primary" />
                  )}
                </div>
                <h3 className="text-xl font-bold text-foreground">{member.name}</h3>
                <p className="text-lg font-medium text-primary">{member.role}</p>
                {member.department && (
                  <Badge className={`mt-2 ${getDepartmentColor(member.department)}`}>
                    {member.department}
                  </Badge>
                )}
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {member.bio}
                </p>

                <div className="space-y-3">
                  {member.yearsOfService && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {member.yearsOfService} years of service
                      </span>
                    </div>
                  )}
                  
                  {member.education && (
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {member.education}
                      </span>
                    </div>
                  )}

                  {member.favoriteVerse && (
                    <div className="flex items-start gap-2">
                      <Heart className="w-4 h-4 text-muted-foreground mt-0.5" />
                      <span className="text-sm text-muted-foreground">
                        Favorite verse: {member.favoriteVerse}
                      </span>
                    </div>
                  )}
                </div>

                {member.specialties && member.specialties.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-foreground">Specialties:</h4>
                    <div className="flex flex-wrap gap-2">
                      {member.specialties.map((specialty, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {(member.email || member.phone) && (
                  <div className="pt-4 border-t space-y-2">
                    {member.email && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="w-full justify-start text-sm h-auto p-2"
                        onClick={() => window.open(`mailto:${member.email}`, '_blank')}
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        {member.email}
                      </Button>
                    )}
                    {member.phone && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="w-full justify-start text-sm h-auto p-2"
                        onClick={() => window.open(`tel:${member.phone}`, '_blank')}
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        {member.phone}
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-3xl font-bold text-foreground mb-4">
            Want to Connect with Our Team?
          </h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our pastoral team is here to support you on your spiritual journey. Whether you need prayer, 
            guidance, or just want to connect, we'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
              onClick={() => window.open('/contact', '_blank')}
            >
              <Mail className="w-5 h-5 mr-2" />
              Contact Us
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-emerald-200 text-foreground hover:bg-emerald-50 dark:border-emerald-800 dark:hover:bg-emerald-950"
              onClick={() => window.open('/get-involved', '_blank')}
            >
              <Handshake className="w-5 h-5 mr-2" />
              Get Involved
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}