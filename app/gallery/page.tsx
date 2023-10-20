import { getGallery, getVideos } from '@/lib/actions/user';
import Gallery from './_components/Gallery';

const page = async () => {
  const images = await getGallery();
  const videos = await getVideos();
  return <Gallery images={images} videos={videos} />;
};

export default page;
