import { getSingleEvent } from '@/lib/actions/user';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import Event from './_component/Event';
type Props = {};

const page = async ({ params }: { params: { eventId: string } }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['event'],
    queryFn: async () => await getSingleEvent(params?.eventId as string),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Event eventId={params?.eventId} />
    </HydrationBoundary>
  );
};

export default page;
