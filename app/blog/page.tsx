'use client';
import { NextPage } from 'next';
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { fetchAllPosts } from '@/lib/actions/post';
import PostCard from './_component/PostCard';
import dateFormat from 'dateformat';
import { useState } from 'react';
import { Button } from '@/components/UI/button';
interface Props {}
const maxPostsPerPage = 10;
const Posts: NextPage<Props> = ({}) => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(0);
  const { isPending, isError, error, data, isFetching } = useQuery({
    queryKey: ['posts', page],
    queryFn: () => fetchAllPosts(page),
    placeholderData: keepPreviousData,
  });
  if (Array.isArray(data) && data?.length === 0) {
    return (
      <div className="min-h-screen w-[90%]  mx-auto sm:w-[70%] py-[150px]">
        <div className="bg-bg-img bg-cover bg-no-repeat py-16 flex items-center justify-center  rounded-md  mx-auto mb-8">
          <h1 className="font-bold text-3xl">Read our blog</h1>
        </div>
        <div className="text-center  flex items-center justify-center ">
          No posts yet
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen w-[90%]  mx-auto sm:w-[70%] py-[150px]">
      <div className="bg-bg-img bg-cover bg-no-repeat relative overflow-hidden py-16 flex items-center justify-center  rounded-md  mx-auto mb-8">
        <div className="bg-black/50 absolute w-full h-full"></div>
        <h1 className="font-bold text-3xl text-white z-10">Read our blog</h1>
      </div>
      <div className="mb-8">
        <p className="font-semibold text-2xl first-letter:capitalize">
          Weekly Articles With Insight Into Our Foundation
        </p>
      </div>
      {isPending ? (
        <div className="text-center min-h-screen flex items-center justify-center ">
          Loading...
        </div>
      ) : isError ? (
        <div className="text-center min-h-screen flex items-center justify-center ">
          Error: {error?.message}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Array.isArray(data) && data.length > 0 ? (
            data?.map((post, i) => {
              const formattedDate = dateFormat(post?.createdAt, 'd-mmm-yyyy');
              return (
                <PostCard
                  key={i}
                  post={post}
                  formattedDate={formattedDate}
                  tags={post?.tags}
                />
              );
            })
          ) : (
            <div>No posts yet</div>
          )}
        </div>
      )}
      <div className="flex  items-center justify-center space-x-4 mt-6"></div>
      <div className="flex items-center justify-center space-x-4 mt-6">
        <Button
          className="border bg-black p-2 rounded-md inline-block  text-white"
          onClick={() => setPage((old) => Math.max(old - 1, 0))}
          disabled={isFetching || page === 0}
        >
          Previous Page
        </Button>{' '}
        <Button
          className="border bg-black p-2 rounded-md inline-block text-white"
          disabled={
            isFetching || (Array.isArray(data) && data.length < maxPostsPerPage)
          }
          onClick={() => {
            setPage((old) => old + 1);
          }}
          // Disable the Next Page button until we know a next page is available
        >
          Next Page
        </Button>
      </div>
    </div>
  );
};

export default Posts;
