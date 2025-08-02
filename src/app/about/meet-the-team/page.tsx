import { Metadata } from 'next';
import TeamHero from '@/app/about/meet-the-team/components/TeamHero';
import TeamMembers from '@/app/about/meet-the-team/components/TeamMembers';
import { getTeamMembers } from '../../../../lib/contentful-api';

export const metadata: Metadata = {
  title: 'Meet the Team | Christ Community',
  description: 'Get to know our dedicated pastoral staff and leadership team who serve our community with passion and purpose.',
};

export default async function MeetTheTeamPage() {
  const teamMembers = await getTeamMembers();

  return (
    <>
      <TeamHero />
      <TeamMembers teamMembers={teamMembers} />
    </>
  );
} 