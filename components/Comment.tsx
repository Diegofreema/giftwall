'use client';

import React, { useCallback, useEffect, useState } from 'react';
import CommentForm from './CommentForm';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createComment,
  deleteComment,
  getComments,
  replyToComment,
  updateComment,
} from '@/lib/actions/comments';
import { CommentResponse } from '@/lib/validator';
import CommentCard from './CommentCard';
import { useAuth } from '@clerk/nextjs';
import { User, getUser } from '@/lib/actions/member';
import { IUser } from '@/lib/model/user';

import { useToast } from './UI/use-toast';
import { useRouter } from 'next/navigation';
import { comment } from 'postcss';
import { useAuthHook } from '@/hook/useDeleteHook';
import { useDeleteHook } from '@/hook/useAuth';
import { DeleteModal } from './DeleteModal';

type Props = {
  belongsTo?: string;
};

const Comment = ({ belongsTo }: Props) => {
  const { userId } = useAuth();
  console.log(userId);

  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState<CommentResponse[]>([]);
  const [commentToDelete, setCommentToDelete] =
    useState<CommentResponse | null>(null);

  const { onOpen } = useAuthHook();
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const getCommentsFn = async () => {
      setIsLoading(true);
      try {
        const allComments = await getComments(belongsTo as any, userId as any);
        Array.isArray(allComments) && setComments(allComments);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getCommentsFn();
  }, [belongsTo, userId]);

  console.log(comments);

  const { mutate, isPending } = useMutation({
    mutationFn: async (value: any) => handleSubmit(value),
    onSuccess: async (data) => {
      ///@ts-ignore
      if (data?.content) setComments([...comments, data]);

      console.log(data);
    },
  });

  const updateDeletedId = useCallback(
    (deletedComment: CommentResponse) => {
      if (!comments) return;
      let newComments = [...comments];
      if (deletedComment?.chiefComment)
        newComments = newComments?.filter(
          ({ id }) => id !== deletedComment?.id
        );
      else {
        const chiefCommentIndex = newComments.findIndex(
          ({ id }) => id === deletedComment?.repliedTo
        );
        const newReplies = newComments[chiefCommentIndex]?.replies?.filter(
          ({ id }) => id !== deletedComment?.id
        );

        newComments[chiefCommentIndex].replies = newReplies;
      }
      setComments([...newComments]);
    },
    [comments]
  );

  const handleSubmit = async (value: any) => {
    // @ts-ignore
    const user: User = await getUser(userId as any);

    if (!userId) {
      toast({
        variant: 'destructive',
        title: 'Wait a minute',
        description: 'Please sign in to comment',
      });
      return;
    }

    try {
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

    let updatedCommentt = [...comments];
    if (newComment.chiefComment) {
      const index = updatedCommentt.findIndex(({ id }) => id === newComment.id);
      updatedCommentt[index].content = newComment.content;
    } else {
      const chiefCommentIndex = updatedCommentt.findIndex(
        ({ id }) => id === newComment.repliedTo
      );
      let newReplies = updatedCommentt[chiefCommentIndex].replies;
      newReplies = newReplies?.map((comment) => {
        if (comment.id === newComment.id) comment.content = newComment.content;

        return comment;
      });
      updatedCommentt[chiefCommentIndex].replies = newReplies;
    }
    setComments([...updatedCommentt]);
  };
  const handleUpdateSubmit = async (content: string, id: string) => {
    try {
      const comment = await updateComment(id, content, userId as string);
      updateComments(comment as CommentResponse);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReply = async (content: string, id: string) => {
    try {
      const reply = await replyToComment(id, content, userId as any);
      insertReply(reply as CommentResponse);
      return reply;
    } catch (error) {
      console.log(error);
    }
  };

  const handleModal = async (comment: CommentResponse) => {
    setCommentToDelete(comment);
    setShowModal(true);
  };
  const handleDeleteCancel = async () => {
    setCommentToDelete(null);
    setShowModal(false);
  };
  const handleDeleteConfirm = async () => {
    if (!commentToDelete) return;

    try {
      await deleteComment(commentToDelete?.id as any);
      updateDeletedId(commentToDelete as CommentResponse);
      console.log('comment deleted');
    } catch (error) {
      console.log(error);
    } finally {
      setCommentToDelete(null);
      setShowModal(false);
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
          return (
            <div className="mt-8" key={comment?.id}>
              <CommentCard
                // @ts-ignore
                comment={comment}
                showControls={userId === comment?.owner?.userId}
                onReplySubmit={(content) => handleReply(content, comment?.id)}
                onUpdateSubmit={(content) =>
                  handleUpdateSubmit(content, comment?.id)
                }
                onDelete={() => handleModal(comment)}
              />
              {comment?.replies?.length ? (
                <div className=" w-[93%] ml-auto space-y-3">
                  <h1 className="mt-3 text-black mb-3">Replies</h1>
                  {comment?.replies?.map((reply) => {
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
                        onDelete={() => handleModal(comment)}
                      />
                    );
                  })}
                </div>
              ) : null}
            </div>
          );
        })
      ) : null}

      <DeleteModal
        visible={showModal}
        onCancel={handleDeleteCancel}
        onDelete={handleDeleteConfirm}
      />
    </div>
  );
};

export default Comment;
