import { Metadata } from 'next';
import TeamHero from '@/app/about/meet-the-team/components/TeamHero';
import TeamMembers from '@/app/about/meet-the-team/components/TeamMembers';

export const metadata: Metadata = {
  title: 'Meet the Team | Christ Community',
  description: 'Get to know our dedicated pastoral staff and leadership team who serve our community with passion and purpose.',
};

export default function MeetTheTeamPage() {
  return (
    <>
      <TeamHero />
      <TeamMembers />
    </>
  );
} 