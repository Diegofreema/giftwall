export type Slider = {
  imgUrl: string;
  heading: string;
  description: string;
}[];

export type PriorityProps = {
  priorities: {
    heading: string;
    description: string;

    url: string;
  }[];
};

export type TeamProps = {
  team: {
    name: string;
    job: string;

    imgUrl: string;
  }[];
};

export type ProjectProps = {
  project: {
    name: string;
    imgUrl: string;
  }[];
  videos: {
    name: string;
    videoUrl: string;
  }[];
};

export type GalleryProps = {
  images: {
    imgUrl: string;
  }[];
  videos: {
    videoUrl: string;
  }[];
};

export type AboutProps = {
  goals: {
    heading: string;
    description: string;
  }[];
  obj: {
    heading: string;
    description: string;
  }[];
};
