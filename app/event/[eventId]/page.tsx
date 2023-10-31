import { getEvents, getSingleEvent } from '@/lib/actions/user';
import { Title } from '@mantine/core';
import Image from 'next/image';
import React from 'react';
import moment from 'moment-timezone';
import dateFormat from 'dateformat';
import { cn } from '@/lib/utils';
type Props = {};

const page = async ({ params }: { params: { eventId: string } }) => {
  const event = await getSingleEvent(params?.eventId as string);

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

export default page;
