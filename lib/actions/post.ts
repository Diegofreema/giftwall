'use server';
import BlogContent from '../model/blogPosts';
import { connectToDB } from '../mongoose';

export async function fetchSinglePost(id: string) {
  try {
    connectToDB();

    const slugExists = await BlogContent.findById(id);
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

    const posts = await BlogContent.find()
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
