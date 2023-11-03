'use server';

import { auth } from '@clerk/nextjs';
import { connectToDB } from '../mongoose';

import { NextResponse } from 'next/server';
import { formatComment } from '../validator';
import User from '../model/user';

import Com from '../model/comm';
import Article from '../model/post';
export const createComment = async (
  content: string,
  ownerId: string,
  postId?: string
) => {
  connectToDB();

  try {
    const user = await User.findOne({ _id: ownerId });

    const post = await Article.findById({ _id: postId });
    if (!post) return { message: 'Post not found' };

    const comment = new Com({
      content,
      owner: ownerId,
      belongsTo: postId,
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
  userId: string
) => {
  connectToDB();

  try {
    const user = await User.findOne({ userId });
    if (!user) return { message: 'user not found' };
    const chiefComment = await Com.findOne({
      _id: replyToId,

      chiefComment: true,
    });
    if (!chiefComment) return { message: 'Comment not found' };
    const replyComment = new Com({
      content: content.toString(),
      owner: user?._id,
      replyTo: replyToId,
    });

    if (chiefComment.replies)
      // @ts-ignore
      chiefComment.replies = [...chiefComment.replies, replyComment._id];
    await chiefComment.save();
    await replyComment.save();

    const finalComment = await replyComment.populate('owner');
    return formatComment(finalComment, user);
  } catch (error) {
    console.log(error);

    return { message: 'Failed to reply to comment' };
  }
};
export const likeComment = async (
  commentId: string,

  userId: string
) => {
  connectToDB();
  const user = await User.findOne({ userId });
  try {
    const comment = await Com.findById({ _id: commentId })
      .populate({ path: 'owner', select: 'name avatarUrl userId' })
      .populate({
        path: 'replies',
        populate: {
          path: 'owner',
          select: 'name avatarUrl userId',
        },
      })
      .select('createdAt likes content repliedTo chiefComment ');
    if (!comment) return { message: 'Comment not found' };
    const oldLikes = comment.likes || [];

    const likedBy = user?._id as any;

    if (oldLikes.includes(likedBy)) {
      comment.likes = oldLikes.filter(
        (like) => like.toString() !== likedBy.toString()
      );
    } else {
      comment.likes = [...oldLikes, likedBy];
    }

    await comment.save();

    return {
      ...formatComment(comment, user),
      replies: comment.replies?.map((reply: any) => formatComment(reply, user)),
    };
  } catch (error) {
    console.log(error);

    return { message: 'Failed to reply to comment' };
  }
};
export const deleteComment = async (commentId: string) => {
  try {
    const comment = await Com.findOne({ _id: commentId });

    if (!comment) return { message: 'comment not found' };
    if (comment.chiefComment) await Com.deleteMany({ replyTo: commentId });
    else {
      const chiefComment = await Com.findById(comment.replyTo);
      if (chiefComment?.replies?.includes(commentId as any)) {
        chiefComment.replies = chiefComment.replies.filter(
          (comment) => comment.toString() !== commentId.toString()
        );
        await chiefComment.save();
      }
    }

    await Com.findByIdAndDelete(commentId);

    return { removed: true };
  } catch (error) {
    console.log(error);

    return { message: 'Failed to delete comment' };
  }
};
export const updateComment = async (
  commentId: string,
  content: string,
  ownerId: string
) => {
  const user = await User.findOne({ userId: ownerId });
  connectToDB();

  try {
    const comment = await Com.findOne({
      _id: commentId,
      owner: user?.id,
    }).populate('owner');

    if (!comment)
      return NextResponse.json(
        { message: 'comment not found' },
        { status: 404 }
      );

    comment.content = content;
    await comment.save();
    const finalComment = formatComment(comment);
    return finalComment;
  } catch (error) {
    console.log(error);

    return { message: 'Failed to update to comment' };
  }
};
export const getComments = async (belongsTo: string, userId: string) => {
  connectToDB();

  try {
    const user = await User.findOne({ userId: userId });
    const post = await Article.findOne({ _id: belongsTo });
    if (!post) return { message: 'Post not found' };
    const comments = await Com.find({ belongsTo })
      .populate({ path: 'owner', select: 'name avatarUrl userId' })
      .populate({
        path: 'replies',
        populate: {
          path: 'owner',
          select: 'name avatarUrl userId',
        },
      })
      .select('createdAt likes content repliedTo chiefComment ');
    if (!comments) return { message: 'comment' };

    const formattedComment = comments.map((comment) => {
      return {
        ...formatComment(comment, user),
        replies: comment?.replies?.map((reply: any) =>
          formatComment(reply, user)
        ),
      };
    });
    return formattedComment;
  } catch (error) {
    console.log(error);

    return { message: 'Failed to get to comment' };
  }
};
