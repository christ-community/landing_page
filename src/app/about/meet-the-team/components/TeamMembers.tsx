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
  Heart
} from 'lucide-react';
import type { ITeamMember } from '../../../../../types/contentful';
import { processAsset } from '@/lib/contentful-utils';

interface TeamMembersProps {
  teamMembers: ITeamMember[];
}

const getDepartmentColor = (department: string) => {
  return 'bg-muted text-foreground';
};

export default function TeamMembers({ teamMembers }: TeamMembersProps) {
  return (
    <section className="section">
      <div className="section-inner">
        <div className="text-center stack-lg mb-12">
          <div className="stack">
            <p className="eyebrow">Leadership</p>
            <h2 className="section-title">Our Leadership Team</h2>
          </div>
          <p className="section-lead max-w-3xl mx-auto">
            Each member of our team brings unique gifts, experience, and passion to serve our community.
            Together, we're committed to shepherding, teaching, and supporting our congregation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {teamMembers.map((member, index) => (
            <Card key={index} className="border border-border/40 transition-all duration-300 hover:shadow-md">
              <CardHeader className="text-center pb-4">
                <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center mb-4 overflow-hidden">
                  {member.profileImage ? (
                    <Image
                      src={processAsset(member.profileImage) || '/Church-Conference.jpg'}
                      alt={member.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <Users className="w-10 h-10 text-foreground" />
                  )}
                </div>
                <h3 className="text-xl font-semibold text-foreground">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
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
                  <div className="pt-4 border-t border-border/40 space-y-2">
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
        <div className="bg-muted/30 rounded-[var(--radius)] p-8 md:p-12 text-center">
          <h3 className="text-2xl font-semibold text-foreground mb-4">
            Want to Connect with Our Team?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our pastoral team is here to support you on your spiritual journey. Whether you need prayer, 
            guidance, or just want to connect, we'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => window.open('/contact', '_blank')}>
              <Mail className="w-5 h-5 mr-2" />
              Contact Us
            </Button>
            <Button size="lg" variant="outline" onClick={() => window.open('/get-involved', '_blank')}>
              Get Involved
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
