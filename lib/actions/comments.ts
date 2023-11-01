'use server';

import { auth } from '@clerk/nextjs';
import { connectToDB } from '../mongoose';
import Post from '../model/user';
import Comment from '../model/comment';
import { NextResponse } from 'next/server';
import { formatComment } from '../validator';
export const createComment = async (
  content: string,
  ownerId: string,
  postId?: string
) => {
  const { user } = auth();
  if (!user) return { message: 'User not authenticated' };
  connectToDB();

  try {
    const post = await Post.findById({ _id: postId });
    if (!post) return { message: 'Post not found' };

    const comment = new Comment({
      content,
      owner: ownerId,
      chiefComment: true,
    });

    await comment.save();
    const finalComment = await comment.populate('owner');
    return formatComment(finalComment, user);
  } catch (error) {
    console.log(error);

    return { message: 'Failed to create comment' };
  }
};
export const replyToComment = async (
  replyToId: string,
  content: string,
  ownerId: string
) => {
  const { user } = auth();
  if (!user) return { message: 'User not authenticated' };
  connectToDB();

  try {
    const chiefComment = await Comment.findOne({
      _id: replyToId,

      chiefComment: true,
    });
    if (!chiefComment) return { message: 'Comment not found' };
    const replyComment = new Comment({
      content,
      owner: ownerId,
      replyTo: replyToId,
    });

    if (chiefComment.replies)
      chiefComment.replies = [...chiefComment.replies, replyComment._id];
    await chiefComment.save();
    await replyComment.save();
    return replyComment;
  } catch (error) {
    console.log(error);

    return { message: 'Failed to reply to comment' };
  }
};
export const likeComment = async (
  commentId: string,

  likeId: string
) => {
  const { user } = auth();
  if (!user) return { message: 'User not authenticated' };
  connectToDB();

  try {
    const comment = await Comment.findById({ _id: commentId });
    if (!comment) return { message: 'Comment not found' };
    const oldLikes = comment.likes || [];

    const likedBy = likeId as any;

    if (oldLikes.includes(likedBy)) {
      comment.likes = oldLikes.filter(
        (like) => like.toString() !== likedBy.toString()
      );
    } else {
      comment.likes = [...oldLikes, likedBy];
    }

    await comment.save();

    return { message: 'comment' };
  } catch (error) {
    console.log(error);

    return { message: 'Failed to reply to comment' };
  }
};
export const deleteComment = async (
  commentId: string,

  ownerId: string
) => {
  const { user } = auth();
  if (!user) return { message: 'User not authenticated' };
  connectToDB();

  try {
    const comment = await Comment.findOne({ _id: commentId, owner: ownerId });

    if (!comment)
      return NextResponse.json(
        { message: 'comment not found' },
        { status: 404 }
      );

    if (comment.chiefComment) await Comment.deleteMany({ replyTo: commentId });
    else {
      const chiefComment = await Comment.findById(comment.replyTo);
      if (chiefComment?.replies?.includes(commentId as any)) {
        chiefComment.replies = chiefComment.replies.filter(
          (reply) => reply.toString() !== commentId.toString()
        );

        await chiefComment.save();
      }
    }
    await Comment.findByIdAndDelete(commentId);

    return { removed: true };
  } catch (error) {
    console.log(error);

    return { message: 'Failed to reply to comment' };
  }
};
export const updateComment = async (
  commentId: string,
  content: string,
  ownerId: string
) => {
  const { user } = auth();
  if (!user) return { message: 'User not authenticated' };
  connectToDB();

  try {
    const comment = await Comment.findOne({ _id: commentId, owner: ownerId });

    if (!comment)
      return NextResponse.json(
        { message: 'comment not found' },
        { status: 404 }
      );

    comment.content = content;
    await comment.save();

    return NextResponse.json(comment);
  } catch (error) {
    console.log(error);

    return { message: 'Failed to update to comment' };
  }
};
export const getComments = async (belongsTo: string) => {
  const { user } = auth();
  if (!user) return { message: 'User not authenticated' };
  connectToDB();

  try {
    const comments = await Comment.find({ belongsTo })
      .populate({ path: 'owner', select: 'name avatar' })
      .populate({
        path: 'replies',
        populate: {
          path: 'owner',
          select: 'name avatar',
        },
      })
      .select('createdAt likes content repliedTo');
    if (!comments) return { message: 'comment' };

    const formattedComment = comments.map((comment) => {
      return {
        ...formatComment(comment, user),
        replies: comment.replies?.map((reply: any) =>
          formatComment(reply, user)
        ),
      };
    });
    return formattedComment;
  } catch (error) {
    console.log(error);

    return { message: 'Failed to update to comment' };
  }
};
