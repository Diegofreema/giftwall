'use server';
import { auth } from '@clerk/nextjs';
import User, { IUser } from '../model/user';
import { connectToDB } from '../mongoose';

export const createUser = async (value: IUser) => {
  const { userId, email, name, avatarUrl } = value;
  try {
    connectToDB();
    const user = await User.create({
      userId,
      email,
      name,
      avatarUrl,
      boarded: true,
      role: 'user',
    });

    return { message: 'User created' };
  } catch (error) {
    return { message: 'Failed to create user' };
  }
};

export type User = {
  name: string;
  id: string;
  userId: string;
  role: 'user' | 'admin';
  avatarUrl: string;
  boarded: boolean;
};

export const getUser = async (id: string) => {
  try {
    connectToDB();
    const user = await User.findOne({ userId: id });

    if (!user) return { message: 'User not found' };

    return {
      name: user?.name,
      id: user?._id.toString(),
      avatarUrl: user?.avatarUrl,
      userId: user?.userId,
      role: user?.role,
      boarded: user?.boarded,
    };
  } catch (error) {
    return { message: 'User not found' };
  }
};
