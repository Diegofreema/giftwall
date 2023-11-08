'use client';
import { fetchSinglePost, getLikeStatus, updateLike } from '@/lib/actions/post';
import { useQuery } from '@tanstack/react-query';
import { NextPage } from 'next';
import Head from 'next/head';
import { useParams } from 'next/navigation';
import dateFormat from 'dateformat';
import parse from 'html-react-parser';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import Comment from '@/components/Comment';
import LikeComponent from '@/components/LikeComponent';
import { useUser } from '@clerk/nextjs';
import { useToast } from '@/components/UI/use-toast';
import Link from 'next/link';
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
  const { user } = useUser();
  const { toast } = useToast();
  const [likes, setLikes] = useState({ likedByOwner: false, count: 0 });
  const [likeBusy, setLikeBusy] = useState(false);
  const params = useParams();

  const {
    data: post,
    isFetching,
    error,
  } = useQuery({
    queryKey: ['post', params?.postId],
    queryFn: async () => {
      const post = await fetchSinglePost(params?.postId as string);
      return post;
    },
  });
  useEffect(() => {
    const getLikedStatusFn = async () => {
      try {
        const likeStatus = await getLikeStatus(
          params?.postId as string,
          user?.id as string
        );
        setLikes({
          likedByOwner: likeStatus.likedByOwner as boolean,
          count: likeStatus.likesCount as number,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getLikedStatusFn();
  }, [params?.postId, user]);

  const getLikeLabel = useCallback((): string => {
    const { count, likedByOwner } = likes;
    if (likedByOwner && count === 1) return 'You liked this post.';
    if (likedByOwner && count > 1)
      return `You and ${count - 1} other(s) liked this post.`;
    if (count === 0) return 'Like this post';
    return `${count} person(s) liked this post.`;
  }, [likes]);
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
        {'Post not found!!'}
      </div>
    );
  }
  const handleLick = async () => {
    if (!user)
      return toast({
        description: 'Please login to like',
        variant: 'destructive',
      });
    setLikeBusy(true);
    try {
      const like = await updateLike(post?.id as string, user?.id as string);
      setLikes({
        likedByOwner: !likes.likedByOwner,
        count: like?.newLikes as number,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLikeBusy(false);
    }
  };
  const tags = post?.tags?.join(', ');
  if (!post?.id)
    return (
      <div className="flex items-center justify-center min-h-screen">
        No post found
      </div>
    );
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
          {post?.tags?.length > 0 &&
            post?.tags?.map((tag, i) => (
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
      <div className="py-4">
        <LikeComponent
          liked={likes.likedByOwner}
          label={getLikeLabel()}
          onClick={handleLick}
          busy={likeBusy}
        />
      </div>
      {post?.relatedPosts?.length > 0 && (
        <div className="pt-5 mb-4">
          <h3 className="text-xl font-semibold text-gray-800">
            Related posts:
          </h3>
          <div className="space-y-4">
            {post?.relatedPosts?.map((post, i) => (
              <Link
                key={i}
                href={`/blog/${post?.id}`}
                className="font-semibold text-sm hover:underline transition"
              >
                {post?.title}
              </Link>
            ))}
          </div>
        </div>
      )}
      <Comment belongsTo={post?.id} />
    </div>
  );
};

export default SinglePost;
