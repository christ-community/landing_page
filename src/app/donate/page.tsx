import { Metadata } from 'next';
import GiveToday from '@/components/GiveToday';

export const metadata: Metadata = {
  title: 'Donate | Christ Community',
  description: 'Support our ministry and make a difference in our community through your generous giving.',
};

export default function DonatePage() {
  return (
    <>
      <GiveToday />
    </>
  );
} 