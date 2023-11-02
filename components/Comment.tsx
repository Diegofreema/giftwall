'use client';

import React, { useEffect, useState } from 'react';
import CommentForm from './CommentForm';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createComment,
  getComments,
  replyToComment,
  updateComment,
} from '@/lib/actions/comments';
import { CommentResponse } from '@/lib/validator';
import CommentCard from './CommentCard';
import { useAuth } from '@clerk/nextjs';
import { User, getUser } from '@/lib/actions/member';
import { IUser } from '@/lib/model/user';
import { useAuthHook } from '@/hook/useAuth';
import { useToast } from './UI/use-toast';
import { useRouter } from 'next/navigation';
import { comment } from 'postcss';

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
      // @ts-ignore

      return comments;
    },
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
  const insertReply = (reply: CommentResponse) => {
    if (!comments) return;
    let updatedComments = [...comments];
    const chiefIndex = updatedComments.findIndex(
      ({ id }) => id === reply.repliedTo
    );

    const { replies } = updatedComments[chiefIndex];
    if (replies) {
      updatedComments[chiefIndex].replies = [...replies, reply];
    } else {
      updatedComments[chiefIndex].replies = [reply];
    }
    setComments([...updatedComments]);
  };
  const updateComments = (newComment: CommentResponse) => {
    if (!comment) return;
    if (newComment.chiefComment) {
      const index = comments.findIndex(({ id }) => id === newComment.id);
    }
  };
  const handleUpdateSubmit = async (content: string, id: string) => {
    try {
      const comment = await updateComment(id, content, userId as string);
      updateComments(comment as CommentResponse);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    Array.isArray(allComments) && setComments(allComments);
  }, [allComments]);
  const handleReply = async (content: string, id: string) => {
    try {
      const reply = await replyToComment(id, content, userId as any);
      insertReply(reply as CommentResponse);
      return reply;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="py-2">
      <CommentForm onSubmit={mutate} busy={isPending} />

      {isLoading ? (
        <p className="mt-8">Loading comments...</p>
      ) : comments?.length > 1 ? (
        //@ts-ignore
        comments?.map((comment) => {
          const { replies } = comment;
          return (
            <div className="mt-8" key={comment.id}>
              <CommentCard
                // @ts-ignore
                comment={comment}
                showControls={userId === comment?.owner.userId}
                onReplySubmit={(content) => handleReply(content, comment.id)}
                onUpdateSubmit={(content) =>
                  handleUpdateSubmit(content, comment?.id)
                }
              />
              {replies?.length ? (
                <div className=" w-[93%] ml-auto space-y-3">
                  <h1 className="mt-3 text-black mb-3">Replies</h1>
                  {replies?.map((reply) => {
                    return (
                      <CommentCard
                        key={reply.id}
                        // @ts-ignore
                        comment={reply}
                        showControls={userId === reply?.owner?.userId}
                        onReplySubmit={(content) =>
                          handleReply(content, reply.id)
                        }
                        onUpdateSubmit={(content) =>
                          handleUpdateSubmit(content, reply?.id)
                        }
                      />
                    );
                  })}
                </div>
              ) : null}
            </div>
          );
        })
      ) : null}
    </div>
  );
};

export default Comment;
