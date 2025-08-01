'use client';

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

interface TeamMember {
  name: string;
  role: string;
  department: string;
  bio: string;
  specialties: string[];
  yearsOfService: number;
  education?: string;
  email?: string;
  phone?: string;
  image?: string;
  favoriteVerse?: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Pastor Michael Johnson",
    role: "Senior Pastor",
    department: "Leadership",
    bio: "Pastor Michael has been leading Christ Community for over 10 years with a heart for expository teaching and pastoral care. He is passionate about seeing people grow in their relationship with Christ and building authentic community.",
    specialties: ["Expository Preaching", "Pastoral Care", "Leadership Development"],
    yearsOfService: 10,
    education: "M.Div from Westminster Seminary",
    email: "pastor.michael@christcommunity.org",
    phone: "(555) 123-4567",
    favoriteVerse: "Ephesians 4:11-13"
  },
  {
    name: "Sarah Williams",
    role: "Associate Pastor",
    department: "Ministry",
    bio: "Pastor Sarah oversees our community outreach programs and women's ministry. Her passion for social justice and community engagement has helped expand our ministry impact throughout the city.",
    specialties: ["Community Outreach", "Women's Ministry", "Social Justice"],
    yearsOfService: 7,
    education: "M.A. in Ministry Leadership",
    email: "pastor.sarah@christcommunity.org",
    favoriteVerse: "Micah 6:8"
  },
  {
    name: "David Chen",
    role: "Youth Pastor",
    department: "Youth & Family",
    bio: "David brings energy and creativity to our youth ministry, helping young people navigate faith in today's world. He's known for his innovative teaching methods and genuine care for each student.",
    specialties: ["Youth Ministry", "Student Discipleship", "Creative Teaching"],
    yearsOfService: 5,
    education: "B.A. in Youth Ministry",
    email: "david@christcommunity.org",
    favoriteVerse: "1 Timothy 4:12"
  },
  {
    name: "Maria Rodriguez",
    role: "Worship Director",
    department: "Creative Arts",
    bio: "Maria leads our worship team with a heart for creating meaningful worship experiences. Her musical background and theological training help bridge the gap between artistry and worship.",
    specialties: ["Worship Leading", "Music Ministry", "Creative Arts"],
    yearsOfService: 6,
    education: "B.M. in Music Ministry",
    email: "maria@christcommunity.org",
    favoriteVerse: "Psalm 150:6"
  },
  {
    name: "James Thompson",
    role: "Family Pastor",
    department: "Family Ministry",
    bio: "James focuses on strengthening families and supporting parents in raising their children with biblical values. He coordinates our children's programs and family events.",
    specialties: ["Children's Ministry", "Family Counseling", "Parent Support"],
    yearsOfService: 8,
    education: "M.A. in Family Ministry",
    email: "james@christcommunity.org",
    favoriteVerse: "Deuteronomy 6:6-7"
  },
  {
    name: "Lisa Park",
    role: "Missions Coordinator",
    department: "Global Outreach",
    bio: "Lisa coordinates our global missions efforts and short-term mission trips. Her heart for the nations has helped our church develop partnerships with ministries around the world.",
    specialties: ["Global Missions", "Cross-Cultural Ministry", "Partnership Development"],
    yearsOfService: 4,
    education: "B.A. in Intercultural Studies",
    email: "lisa@christcommunity.org",
    favoriteVerse: "Matthew 28:19-20"
  }
];

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

export default function TeamMembers() {
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
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary/20 to-tertiary/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Users className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">{member.name}</h3>
                <p className="text-lg font-medium text-primary">{member.role}</p>
                <Badge className={`mt-2 ${getDepartmentColor(member.department)}`}>
                  {member.department}
                </Badge>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {member.bio}
                </p>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {member.yearsOfService} years of service
                    </span>
                  </div>
                  
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