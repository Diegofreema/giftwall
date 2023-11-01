'use server';

import { auth } from '@clerk/nextjs';
import { connectToDB } from '../mongoose';
import Post from '../model/user';
import Comment from '../model/comment';

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
