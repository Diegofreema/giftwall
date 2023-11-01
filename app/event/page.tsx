import { getEvents } from '@/lib/actions/user';
import { Title } from '@mantine/core';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import Image from 'next/image';
import dateFormat from 'dateformat';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Post from './_components/Post';
type Props = {};

const page = async (props: Props) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['events'],
    queryFn: getEvents,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Post />
    </HydrationBoundary>
  );
};

export default page;
