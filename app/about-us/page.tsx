import { getGoals, getObj } from '@/lib/actions/user';
import About from './_components/About';

type Props = {};

const Page = async () => {
  const goals = await getGoals();
  const obj = await getObj();
  return <About goals={goals} obj={obj} />;
};

export default Page;
