'use client';
import { getVideos } from '@/lib/actions/user';
import { Title } from '@mantine/core';
import { useInfiniteQuery } from '@tanstack/react-query';
import { NextPage } from 'next';
import { Fragment, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { IconLoader2 } from '@tabler/icons-react';
import { useInView } from 'react-intersection-observer';
interface Props {}

const Video: NextPage<Props> = ({}) => {
  const [page, setPage] = useState(0);
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    isPending,
    isError,
  } = useInfiniteQuery({
    queryKey: ['videos'],
    queryFn: async ({ pageParam }) => getVideos(pageParam),
    initialPageParam: 0,
    // @ts-ignore
    getNextPageParam: (lastPage, pages) => {
      const nextPage = lastPage.length ? pages.length + 1 : null;
      return nextPage;
    },
  });
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView && !isFetching && hasNextPage) fetchNextPage();
  }, [inView, isFetching, fetchNextPage, hasNextPage]);
  if (isPending) {
    return (
      <div className="min-h-screen py-[110px] flex items-center justify-center  w-[85%]  md:w-[50%] mx-auto ">
        <Title order={2} mb={'md'} ta={'center'} className="text-purple-900">
          Loading...
        </Title>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen py-[110px]  w-[85%] flex items-center justify-center  md:w-[50%] mx-auto ">
        <Title order={2} mb={'md'} ta={'center'} className="text-purple-900">
          Something went wrong
        </Title>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-[110px] px-4 w-[90%] mx-auto md:space-x-3 my-16">
      <div className="grid md:grid-cols-4 grid-cols-1 gap-4 sm:grid-cols-2">
        {data.pages.map((video, i) =>
          video.map(({ videoUrl }) => (
            <div key={i} className="aspect-video">
              <motion.video
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                width="100%"
                height="300px"
                src={videoUrl}
                controls
                className="rounded-xl"
              ></motion.video>
            </div>
          ))
        )}
      </div>
      <div ref={ref} className="flex items-center w-full mt-6">
        {isFetching && hasNextPage ? (
          <div className="flex items-center w-full justify-center">
            <p className="text-center font-semibold">Loading...</p>
          </div>
        ) : (
          <div className="flex items-center w-full justify-center">
            <p className="text-center font-semibold">End of list</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Video;
