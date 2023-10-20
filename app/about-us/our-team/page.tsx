import { getTeam } from '@/lib/actions/user';
import Team from './_components/Team';

const page = async () => {
  const team = await getTeam();
  return <Team team={team} />;
};

export default page;
