'use server';
import { auth } from '@clerk/nextjs';
import User, { IUser } from '../model/user';
import { connectToDB } from '../mongoose';

export const createUser = async (value: IUser) => {
  try {
    connectToDB();
    const user = await User.create({
      ...value,
    });

    return user;
  } catch (error) {
    return { message: 'Failed to create user' };
  }
};

export const getUser = async (id: string) => {
  try {
    connectToDB();
    const user = await User.findOne({ userId: id });

    if (!user) return { message: 'User not found' };

    return user;
  } catch (error) {
    return { message: 'User not found' };
  }
};
