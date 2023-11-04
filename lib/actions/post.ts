'use server';

import Article from '../model/post';
import User from '../model/user';
import { connectToDB } from '../mongoose';

export async function fetchSinglePost(id: string) {
  try {
    connectToDB();

    const slugExists = await Article.findById(id);
    if (!slugExists) {
      return { message: 'Post Not Found' };
    }

    return {
      id: slugExists?._id.toString(),
      author: slugExists?.author,
      title: slugExists?.title,
      content: slugExists?.content,
      meta: slugExists?.meta,
      tags: slugExists?.tags,
      slug: slugExists?.slug,
      createdAt: slugExists?.createdAt,
      thumbnail: slugExists?.thumbnail,
    };
  } catch (error) {
    return { message: 'Failed to Fetch Post' };
  }
}
export async function fetchAllPosts(pageNo?: number) {
  const limit = 10;
  const skip = pageNo || 0 * limit;
  try {
    connectToDB();

    const posts = await Article.find()
      .sort({
        createdAt: 'desc',
      })
      .skip(skip)
      .limit(limit);

    const safePosts = posts?.map((item) => ({
      id: item?._id.toString(),
      author: item?.author,
      title: item?.title,
      content: item?.content,
      meta: item?.meta,
      tags: item?.tags,
      slug: item?.slug,
      createdAt: item?.createdAt.toString(),
      thumbnail: item?.thumbnail,
    }));

    return safePosts;
  } catch (error) {
    console.log(error);

    return { message: 'Failed to Fetch Posts' };
  }
}

export async function updateLike(postId: string, userId: string) {
  try {
    connectToDB();
    const post = await Article.findById(postId).select('likes');
    const user = await User.findOne({ userId });
    if (!post) {
      return { message: 'Post Not Found' };
    }

    const oldLikes = (post?.likes as any[]) || [];

    const likedBy = user?._id as any;

    if (oldLikes.includes(likedBy as any)) {
      post.likes = oldLikes.filter(
        (like) => like.toString() !== likedBy?.toString()
      );
    } else {
      post.likes = [...oldLikes, likedBy];
    }

    await post.save();

    return { newLikes: post.likes.length };
  } catch (error) {
    return { message: 'Failed to Update Like' };
  }
}

export const getLikeStatus = async (postId: string, userId: string) => {
  try {
    connectToDB();
    const post = await Article.findById(postId).select('likes');
    const user = await User.findOne({ userId });
    if (!post) {
      return { message: 'Post Not Found' };
    }

    const postLikes = (post?.likes as any[]) || [];

    if (!user) {
      return { likesCount: postLikes?.length, likedByOwner: false };
    }

    return {
      likesCount: postLikes?.length,
      likedByOwner: postLikes?.includes(user?._id as any),
    };
  } catch (error) {
    return { message: 'Failed to Update Like' };
  }
};
