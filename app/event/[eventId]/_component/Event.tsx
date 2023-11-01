'use client';

import { getSingleEvent } from '@/lib/actions/user';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React from 'react';
import dateFormat from 'dateformat';
type Props = {
  eventId: string;
};

const Event = ({ eventId }: Props) => {
  const { data: event, isFetching } = useQuery({
    queryKey: ['event'],
    queryFn: async () => await getSingleEvent(eventId as string),
  });

  if (isFetching) {
    return (
      <div className="min-h-screen py-[110px] flex justify-center items-center w-[85%]  md:w-[45%] mx-auto ">
        <h1>Loading....</h1>
      </div>
    );
  }

  const formattedDate = dateFormat(event?.startDate, 'dS mmm yyyy');
  const formattedEnd = dateFormat(event?.endDate, 'dS mmm yyyy');
  const formattedDes: string[] = event?.description?.split('.');
  const formattedVenue: string[] = event?.venue?.split('.');
  return (
    <div className="min-h-screen py-[110px] flex justify-center items-center w-[85%]  md:w-[45%] mx-auto ">
      <div className="grid my-8 grid-cols-1 gap-16">
        <div className="overflow-hidden rounded-md h-[400px] md:h-[600px] w-full relative">
          <Image
            fill
            priority
            src={event?.imgUrl}
            alt="image"
            className="object-cover"
          />
        </div>
        <div className="font-semibold space-y-2">
          <h2>
            Theme: <span className=" font-bold">{event?.name}</span>{' '}
          </h2>
          <h3>Venue:</h3>
          <div>
            {formattedVenue.map((item, i) => (
              <p className="text-base font-normal " key={i}>
                {item}.
              </p>
            ))}
          </div>
          <p>{`${event?.endDate && 'From'} ${formattedDate}      ${
            event?.endDate && 'to ' + formattedEnd
          }`}</p>

          <div className="prose prose-lg space-y-2">
            {formattedDes.map((item, i) => (
              <p className={''} key={i}>
                {item}.
              </p>
            ))}

            <p className="mt-5">Amen For Donations.</p>
            <p>Behind MaryGift Walls foundation Account Number:</p>
            <p>1024780415 Bank: UBA</p>
            <p>#togetherwecanmakelivesbetter.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;
