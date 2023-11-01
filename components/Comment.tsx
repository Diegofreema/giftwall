'use client';

import React, { useState } from 'react';
import CommentForm from './CommentForm';
import { useMutation } from '@tanstack/react-query';
import { createComment, getComments } from '@/lib/actions/comments';
import { CommentResponse } from '@/lib/validator';
import CommentCard from './CommentCard';

type Props = {
  belongsTo?: string;
};

const Comment = ({ belongsTo }: Props) => {
  const [comments, setComments] = useState<CommentResponse[]>();
  const userId = '';
  const handleSubmit = (content: string) => {
    console.log(content);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async (value: any) => {
      const comment = await createComment(value, userId, belongsTo);

      return comment;
    },
    onSuccess: async (data) => {
      // @ts-ignore
      setComments((prev) => [...prev, data]);
      const comments = await getComments(belongsTo as any);
      if (Array.isArray(comments)) {
        setComments(comments);
      }
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
