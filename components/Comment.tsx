'use client';

import React, { useEffect, useState } from 'react';
import CommentForm from './CommentForm';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createComment, getComments } from '@/lib/actions/comments';
import { CommentResponse } from '@/lib/validator';
import CommentCard from './CommentCard';
import { useAuth } from '@clerk/nextjs';
import { User, getUser } from '@/lib/actions/member';
import { IUser } from '@/lib/model/user';
import { useAuthHook } from '@/hook/useAuth';
import { useToast } from './UI/use-toast';
import { useRouter } from 'next/navigation';

type Props = {
  belongsTo?: string;
};

const Comment = ({ belongsTo }: Props) => {
  const { userId } = useAuth();

  const { onOpen } = useAuthHook();
  const { toast } = useToast();

  const [comments, setComments] = useState<CommentResponse[]>([]);
  const router = useRouter();

  const {
    data: allComments,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['comments', belongsTo],
    queryFn: async () => {
      const comments = await getComments(belongsTo as any, userId as any);
      if (error) {
        throw new Error('Oh no!');
      }
      return comments;
    },
    retry: 10,
  });
  const { mutate, isPending } = useMutation({
    mutationFn: async (value: any) => handleSubmit(value),
    onSuccess: async (data) => {
      ///@ts-ignore
      setComments((prev) => [...prev, data]);
    },
  });

  const handleSubmit = async (value: any) => {
    // @ts-ignore
    const user: User = await getUser(userId as any);

    console.log(value, user?.id, belongsTo);
    try {
      if (!userId) {
        router.push('/sign-in');
        toast({
          variant: 'destructive',
          title: 'Wait a minute',
          description: 'Please login to comment',
        });
        return;
      }
      if (!user?.boarded) {
        onOpen();
        toast({
          variant: 'destructive',
          title: 'Wait a minute',
          description: 'Please complete your profile to comment',
        });
        return;
      }
      const comment = await createComment(value, user?.id as any, belongsTo);
      console.log(comment);
      toast({
        variant: 'success',
        title: 'Comment sent ',
      });
      return comment;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    Array.isArray(allComments) &&
      // @ts-ignore
      setComments((prev) => [...prev, ...allComments]);
  }, [allComments]);

  return (
    <div className="py-2">
      <CommentForm onSubmit={mutate} busy={isPending} />

      {isLoading ? (
        <p className="mt-8">Loading comments...</p>
      ) : comments.length > 1 ? (
        //@ts-ignore
        comments?.map(({ owner }, i) => (
          <div className="mt-8" key={i}>
            {/* @ts-ignore */}
            <CommentCard owner={owner} />
          </div>
        ))
      ) : null}
    </div>
  );
};

export default Comment;
