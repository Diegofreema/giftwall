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
import ProjectVideo from '../model/projectVideos';
import EventModel from '../model/event';

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
    const events = await EventModel.find();
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
    const safeGallery = gallery?.map((item) => {
      return {
        imgUrl: item?.imgUrl,
      };
    });
    return safeGallery;
  } catch (error: any) {
    throw new Error(`Failed to get gallery: ${error?.message}`);
  }
};
export const getVideos = async () => {
  try {
    connectToDB();
    const videos = await Video.find();
    const safeVideos = videos?.map((item) => {
      return {
        videoUrl: item?.videoUrl,
      };
    });
    return safeVideos;
  } catch (error: any) {
    throw new Error(`Failed to get videos: ${error?.message}`);
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
    const safePriorities = priorities?.map((priority) => {
      const smallCaps = priority?.heading
        .slice(0, 9)
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '-');
      const url = `/about-us/our-priorities#${smallCaps}`;
      return {
        heading: priority?.heading,
        description: priority?.description,
        _id: priority?._id,
        url,
      };
    });
    return safePriorities;
  } catch (error: any) {
    throw new Error(`Failed to get priorities: ${error?.message}`);
  }
};
export const getProjects = async () => {
  try {
    connectToDB();
    const projects = await Project.find();

    const safeProjects = projects?.map((project) => {
      return {
        name: project?.name,
        imgUrl: project?.imgUrl,
        _id: project?._id,
      };
    });
    return safeProjects;
  } catch (error: any) {
    throw new Error(`Failed to get projects: ${error?.message}`);
  }
};
export async function fetchProjectVideos() {
  try {
    connectToDB();

    const projects = await ProjectVideo.find();
    const safeProjects = projects?.map((item) => {
      return {
        name: item?.name,
        videoUrl: item?.videoUrl,
        _id: item?._id,
      };
    });
    return safeProjects;
  } catch (error) {
    console.log(error);

    throw new Error('Failed to get Project Videos');
  }
}
export const getTeam = async () => {
  try {
    connectToDB();
    const teams = await Team.find();
    const safeTeams = teams?.map((team) => {
      return {
        name: team?.name,
        job: team?.job,
        imgUrl: team?.imgUrl,
        _id: team?._id,
      };
    });
    return safeTeams;
  } catch (error: any) {
    throw new Error(`Failed to get teams: ${error?.message}`);
  }
};
