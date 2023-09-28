import Hero from '@/components/Home/Hero';
import Mission from '@/components/Home/Mission';
import Services from '@/components/Home/Services';
import Submission from '@/components/Home/Submission';

export default function Home() {
  return (
    <div className="font-bold text-8xl">
      <Hero />
      <Services />
      <Mission />
      <Submission />
    </div>
  );
}
