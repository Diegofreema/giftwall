'use client';
import { fetchAllPosts, fetchSinglePost } from '@/lib/actions/post';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { NextPage } from 'next';
import Head from 'next/head';
import { useParams } from 'next/navigation';
import dateFormat from 'dateformat';
import parse from 'html-react-parser';
import Image from 'next/image';
import CommentForm from '@/components/CommentForm';
import { useMemo } from 'react';
interface Props {}
interface Post {
  message: string;
  id?: string;
  author?: string;
  title?: string;
  content?: string;
  meta?: string;
  tags?: string[];
  slug?: string;
  createdAt?: string;
  thumbnail?: string | undefined;
}
const SinglePost: NextPage<Props> = ({}): JSX.Element => {
  const params = useParams();
  console.log(params);
  const placeholderData = useMemo(async () => {
    const post = await fetchSinglePost(params?.postId as string);
    return post;
  }, [params?.postId]);
  const {
    data: post,
    isFetching,
    error,
  } = useQuery({
    queryKey: ['post'],
    queryFn: async () => {
      const post = await fetchSinglePost(params?.postId as string);
      return post;
    },
    //@ts-ignore
    placeholderData: (previousData, previousQuery) =>
      previousData || placeholderData,
  });
  if (isFetching) {
    return (
      <div className="min-h-screen w-[90%]  mx-auto sm:w-[70%] py-[100px] flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-[90%]  mx-auto sm:w-[80%] py-[100px] flex items-center justify-center">
        {error.message}
      </div>
    );
  }

  const tags = post?.tags?.join(', ');
  return (
    <div className="md:w-[60%] w-[90%] sm:w-[80%] mx-auto min-h-screen py-[100px] pt-[150px] space-y-5">
      <Head>
        <title>{post?.title}</title>
        <meta name="description" content={post?.meta} />
        <meta name="keywords" content={tags} />
      </Head>
      <div className="space-y-5">
        <h1 className="font-bold sm:text-3xl text-xl max-w-[650px]">
          {post?.title}
        </h1>

        {post?.thumbnail && (
          <div className="relative aspect-video">
            <Image src={post?.thumbnail} alt="thumbnail" fill priority />
          </div>
        )}
        <div className="flex items-center justify-between">
          {post?.tags?.map((tag, i) => (
            <span
              key={i}
              className="tag inline-block bg-purple-900 p-2 rounded-full text-white"
            >
              #{tag}
            </span>
          ))}
          <span>{dateFormat(post?.createdAt, 'd-mmm-yyyy')}</span>
        </div>
        <div className="prose prose-lg max-w-full mx-auto space-y-5">
          {post?.content && parse(post?.content)}
        </div>
      </div>
      <CommentForm />
    </div>
  );
};

export default SinglePost;
