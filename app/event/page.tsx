import { getEvents } from '@/lib/actions/user';
import { Title } from '@mantine/core';
import Image from 'next/image';
import React from 'react';
import moment from 'moment-timezone';
type Props = {};

const page = async (props: Props) => {
  const events = await getEvents();
  const displayEvents =
    events.length > 0 &&
    events?.map((event, i) => {
      const utcMoment = moment.utc(event?.date);
      const date = utcMoment.tz('Africa/Lagos').format('DD/MM/YYYY');
      const time = utcMoment.tz('Africa/Lagos').format('hh:mm A');
      return (
        <div key={i} className="grid my-8 grid-cols-1 md:grid-cols-2 gap-16">
          <div className="overflow-hidden rounded-md w-[100%] h-[300px] relative">
            <Image
              fill
              priority
              src={event?.imgUrl}
              alt="image"
              className="object-cover"
            />
          </div>
          <div className="font-semibold space-y-2">
            <h2>Theme: {event?.name}</h2>
            <h3>Venue: {event?.venue}</h3>
            <h3>Time: {time}</h3>
            <h3>Date: {date}</h3>
            <p>Description: {event?.description}</p>
          </div>
        </div>
      );
    });
  const eventIsEmpty = events?.length === 0;
  return (
    <div className="min-h-screen py-[110px] flex justify-center items-center w-[90%] sm:w-[85%] md:w-[80%] mx-auto ">
      {eventIsEmpty && (
        <Title order={2} ta={'center'}>
          No Events Yet
        </Title>
      )}

      {!eventIsEmpty && (
        <div className="w-full mt-[50px]">
          <Title order={2} mb={'md'} ta={'center'}>
            Our Upcoming Events
          </Title>
          {displayEvents}
        </div>
      )}
    </div>
  );
};

export default page;
