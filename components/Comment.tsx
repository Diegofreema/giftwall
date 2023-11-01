'use client';

import React, { useState } from 'react';
import CommentForm from './CommentForm';
import { useMutation } from '@tanstack/react-query';
import { createComment, getComments } from '@/lib/actions/comments';
import { CommentResponse } from '@/lib/validator';
import CommentCard from './CommentCard';
import { useAuth } from '@clerk/nextjs';
import { User, getUser } from '@/lib/actions/member';
import { IUser } from '@/lib/model/user';
import { useAuthHook } from '@/hook/useAuth';
import { useToast } from './UI/use-toast';

type Props = {
  belongsTo?: string;
};

const Comment = ({ belongsTo }: Props) => {
  const { userId } = useAuth();
  const { onOpen } = useAuthHook();
  const { toast } = useToast();

  const [comments, setComments] = useState<CommentResponse[]>();

  const { mutate, isPending } = useMutation({
    mutationFn: async (value: any) => {
      // @ts-ignore
      const user: User = await getUser(userId as any);
      if (!user?.boarded) {
        onOpen();
        toast({
          variant: 'destructive',
          title: 'Wait a minute',
          description: 'Please complete your profile to comment',
        });
        return;
      }
      console.log(value, user?.id, belongsTo);

      const comment = await createComment(value, user?.id as any, belongsTo);
      console.log(comment);

      return comment;
    },
    onSuccess: async (data) => {
      // @ts-ignore
      // setComments((prev) => [...prev, data]);
      // const comments = await getComments(belongsTo as any);
      // if (Array.isArray(comments)) {
      //   setComments(comments);
      // }
      console.log(data);

      toast({
        variant: 'success',
        title: 'Comment added',
      });
    },
  });
  return (
    <div className="py-2">
      <CommentForm onSubmit={mutate} busy={isPending} />

      {comments?.map(({}, i) => (
        <CommentCard key={i} />
      ))}
    </div>
  );
};

export default Comment;
