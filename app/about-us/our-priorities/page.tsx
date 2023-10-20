import Body from './_components/Body';
import { getPriorities } from '@/lib/actions/user';

const page = async () => {
  const priorities = await getPriorities();
  return <Body priorities={priorities} />;
};

export default page;
