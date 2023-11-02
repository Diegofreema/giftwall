'use client';

import React, { useState } from 'react';
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

  const [comments, setComments] = useState<CommentResponse[]>();
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
      } else {
        Array.isArray(comments) && setComments(comments);
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

  return (
    <div className="py-2">
      <CommentForm onSubmit={mutate} busy={isPending} />

      {isLoading ? (
        <p>Loading comments...</p>
      ) : (
        comments?.map(({}, i) => <CommentCard key={i} />)
      )}
    </div>
  );
};

export default Comment;
