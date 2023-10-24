import Hero from '@/components/Home/Hero';
import Mission from '@/components/Home/Mission';
import Services from '@/components/Home/Services';
import Submission from '@/components/Home/Submission';
import { getPriorities, getSlider } from '@/lib/actions/user';

export default async function Home() {
  const slider = await getSlider();
  const priorities = await getPriorities();
  return (
    <div className="font-bold text-8xl">
      <Hero slider={slider} />
      {/* <Services /> */}
      <Mission priorities={priorities} />
      <Submission />
    </div>
  );
}
