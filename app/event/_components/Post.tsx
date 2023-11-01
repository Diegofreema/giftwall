'use client';

import { getEvents } from '@/lib/actions/user';
import { cn } from '@/lib/utils';
import { Title } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React from 'react';
import dateFormat from 'dateformat';
import Image from 'next/image';

type Props = {};

const Post = (props: Props) => {
  const {
    data: events,
    isPending,
    isError,
  } = useQuery({ queryKey: ['events'], queryFn: getEvents });
  if (isPending) {
    return (
      <div className="min-h-screen py-[110px]  w-[85%]  md:w-[50%] mx-auto ">
        <Title order={2} mb={'md'} ta={'center'} className="text-purple-900">
          Loading...
        </Title>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen py-[110px]  w-[85%]  md:w-[50%] mx-auto ">
        <Title order={2} mb={'md'} ta={'center'} className="text-purple-900">
          Something went wrong
        </Title>
      </div>
    );
  }
  return (
    <div className="min-h-screen py-[110px]  w-[85%]  md:w-[50%] mx-auto ">
      <Title order={2} mb={'md'} ta={'center'} className="text-purple-900">
        Our Upcoming Events
      </Title>
      <div
        className={cn(
          events?.length > 1
            ? 'grid grid-cols-1 md:grid-cols-2 gap-4'
            : 'grid grid-cols-1 place-items-center',
          'mt-10'
        )}
      >
        {events?.map((event, i) => {
          const formattedDate = dateFormat(event?.startDate, 'dS mmm yyyy');
          const formattedEnd = dateFormat(event?.endDate, 'dS mmm yyyy');

          const formattedVenue: string[] = event?.venue?.split('.');
          const trimText = (text: string, trimBy: number) => {
            if (text.length <= trimBy) {
              return text;
            }
            return text.substring(0, trimBy) + '...';
          };

          return (
            <Link href={`/event/${event?.id}`} key={i}>
              <div className="shadow-md shadow-black/50 max-w-[400px] rounded-md space-y-3  overflow-hidden ">
                <div className="top w-full h-[300px] relative overflow-hidden">
                  <Image
                    src={event?.imgUrl}
                    alt="image"
                    fill
                    priority
                    className="!object-cover"
                  />
                </div>
                <div className="bottom p-4">
                  <h3 className="font-semibold first-letter:capitalize">
                    Theme: {trimText(event?.name, 20)}
                  </h3>
                  <div>
                    Venue: {formattedVenue[0]}...
                    <p>
                      Date: {formattedDate}{' '}
                      {formattedEnd && ' - ' + formattedEnd}
                    </p>
                  </div>

                  <span className="first-letter:capitalize">
                    {trimText(event?.description, 70)}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Post;
