'use server';
import { NextResponse } from 'next/server';
import Volunteer from '../model/volunteer';
import { connectToDB } from '../mongoose';
import SliderImg from '../model/slider';
import Event from '../model/event';
import Goal from '../model/goals';
import Gallery from '../model/gallery';
import Obj from '../model/object';
import Priority from '../model/priorities';
import Project from '../model/project';
import Team from '../model/team';
import Video from '../model/video';
import { Slider } from '../types';

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
    throw new Error(`Failed to create volunteer: ${error?.message}`);
  }
};

export const getSlider = async () => {
  try {
    connectToDB();
    const slider: Slider = await SliderImg.find();

    const safeSlider = slider?.map((slider) => {
      return {
        imgUrl: slider?.imgUrl,
        heading: slider?.heading,
        description: slider?.description,
        _id: slider?._id,
      };
    });
    return safeSlider;
  } catch (error: any) {
    throw new Error(`Failed to get slider: ${error?.message}`);
  }
};

export const getEvents = async () => {
  try {
    connectToDB();
    const events = await Event.find();
    return events;
  } catch (error: any) {
    throw new Error(`Failed to get events: ${error?.message}`);
  }
};

export const getGoals = async () => {
  try {
    connectToDB();
    const goals = await Goal.find();
    return goals;
  } catch (error: any) {
    throw new Error(`Failed to get goals: ${error?.message}`);
  }
};
export const getGallery = async () => {
  try {
    connectToDB();
    const gallery = await Gallery.find();
    return gallery;
  } catch (error: any) {
    throw new Error(`Failed to get gallery: ${error?.message}`);
  }
};
export const getObj = async () => {
  try {
    connectToDB();
    const objectives = await Obj.find();
    return objectives;
  } catch (error: any) {
    throw new Error(`Failed to get slider: ${error?.message}`);
  }
};
export const getPriorities = async () => {
  try {
    connectToDB();
    const priorities = await Priority.find();
    return priorities;
  } catch (error: any) {
    throw new Error(`Failed to get priorities: ${error?.message}`);
  }
};
export const getProjects = async () => {
  try {
    connectToDB();
    const projects = await Project.find();
    return projects;
  } catch (error: any) {
    throw new Error(`Failed to get projects: ${error?.message}`);
  }
};
export const getTeam = async () => {
  try {
    connectToDB();
    const teams = await Team.find();
    return teams;
  } catch (error: any) {
    throw new Error(`Failed to get teams: ${error?.message}`);
  }
};
export const getVideos = async () => {
  try {
    connectToDB();
    const videos = await Video.find();
    return videos;
  } catch (error: any) {
    throw new Error(`Failed to get slider: ${error?.message}`);
  }
};
