'use server';
import { NextResponse } from 'next/server';
import Volunteer from '../model/volunteer';
import { connectToDB } from '../mongoose';

export type volunteer = {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  dob: Date | null;
  address: string;
  skill: string;
  country: string;
  reason: string;
};
export const registerVolunteer = async ({
  email,
  firstName,
  lastName,
  phoneNumber,
  dob,
  address,
  skill,
  country,
  reason,
}: volunteer) => {
  connectToDB();
  try {
    await Volunteer.create({
      email,
      firstName,
      lastName,
      phoneNumber,
      dob,
      address,
      skill,
      country,
      reason,
    });
  } catch (error: any) {
    // throw new Error(`Failed to create volunteer: ${error?.message}`);
    return error?.message;
  }
};
