'use server';

import { auth } from '@clerk/nextjs';
import { connectToDB } from '../mongoose';
import Post from '../model/user';
import Comment from '../model/comment';
import { NextResponse } from 'next/server';

export const createComment = async (
  postId: string,
  content: string,
  ownerId: string
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

    return { message: 'Failed to create comment' };
  }
};
