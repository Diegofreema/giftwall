'use client';
import { getGallery } from '@/lib/actions/user';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { NextPage } from 'next';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Title, Image, Center } from '@mantine/core';
import { Loader } from 'lucide-react';
import { IconLoader2 } from '@tabler/icons-react';
interface Props {}

const Images: NextPage<Props> = ({}) => {
  const {
    data,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isPending,
  } = useInfiniteQuery({
    queryKey: ['images'],
    queryFn: async ({ pageParam }) => getGallery(pageParam),
    initialPageParam: 1,
    // @ts-ignore
    getNextPageParam: (lastPage, pages) => {
      const nextPage = lastPage.length ? pages.length + 1 : null;
      return nextPage;
    },
  });

  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView && !isFetching) fetchNextPage();
  }, [inView, isFetching, fetchNextPage]);

  if (isPending) {
    return (
      <div className="min-h-screen py-[110px] flex items-center justify-center w-[85%]  md:w-[50%] mx-auto ">
        <Title order={2} mb={'md'} ta={'center'} className="text-purple-900">
          Loading...
        </Title>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen py-[110px] flex items-center justify-center  w-[85%]  md:w-[50%] mx-auto ">
        <Title order={2} mb={'md'} ta={'center'} className="text-purple-900">
          Something went wrong
        </Title>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-[110px] px-4 w-[90%] mx-auto  md:space-x-3 my-16 ">
      <div className="grid md:grid-cols-4 grid-cols-1 gap-4 sm:grid-cols-2">
        {data?.pages?.map((images, i) =>
          images?.map((img, index) => (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              key={index}
              className="overflow-hidden rounded-md h-[300px]"
            >
              <Image
                src={img.imgUrl}
                alt={'img'}
                w={'100%'}
                h={'100%'}
                fit={'cover'}
                radius={10}
                className="min-h-[200px] object-cover"
              />
            </motion.div>
          ))
        )}
      </div>
      <div ref={ref} className="!flex !items-center w-full mt-6">
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

export default Images;
