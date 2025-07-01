import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Meet the Team | Christ Community',
};

export default function MeetTheTeamPage() {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-4xl font-bold">This is the Meet the Team page</h1>
    </div>
  );
} 