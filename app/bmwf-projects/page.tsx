import { fetchProjectVideos, getProjects } from '@/lib/actions/user';
import Body from './_components/Body';

const page = async () => {
  const projectImages = await getProjects();
  const projectVideos = await fetchProjectVideos();
  return <Body project={projectImages} videos={projectVideos} />;
};

export default page;
