/* eslint-disable camelcase */
// Resource: https://clerk.com/docs/users/sync-data-to-your-backend
// Above article shows why we need webhooks i.e., to sync data to our backend

// Resource: https://docs.svix.com/receiving/verifying-payloads/why
// It's a good practice to verify webhooks. Above article shows why we should do it
import { Webhook, WebhookRequiredHeaders } from 'svix';
import { headers } from 'next/headers';

import { IncomingHttpHeaders } from 'http';

import { NextResponse } from 'next/server';
import { createUser, getUser } from '@/lib/actions/member';
import { auth } from '@clerk/nextjs';

// Resource: https://clerk.com/docs/integration/webhooks#supported-events
// Above document lists the supported events
type EventType = 'user.created' | 'session.created';

type Event = {
  data: Record<string, string | number | Record<string, string>[]>;
  object: 'event';
  type: EventType;
};

export const POST = async (request: Request) => {
  const payload = await request.json();
  const header = headers();

  const heads = {
    'svix-id': header.get('svix-id'),
    'svix-timestamp': header.get('svix-timestamp'),
    'svix-signature': header.get('svix-signature'),
  };

  // Activitate Webhook in the Clerk Dashboard.
  // After adding the endpoint, you'll see the secret on the right side.
  const wh = new Webhook(process.env.NEXT_CLERK_WEBHOOK_SECRET || '');

  let evnt: Event | null = null;

  try {
    evnt = wh.verify(
      JSON.stringify(payload),
      heads as IncomingHttpHeaders & WebhookRequiredHeaders
    ) as Event;
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 400 });
  }

  const eventType: EventType = evnt?.type!;

  if (eventType === 'user.created') {
    const {
      id,

      first_name,
      last_name,
    } = evnt?.data ?? {};
    const { user } = auth();
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    const avatarUrl = user?.imageUrl;
    try {
      // @ts-ignore
      await createUser({
        userId: id as string,
        name: first_name + ' ' + last_name,
        role: 'user',
        avatarUrl: avatarUrl,
      });

      return NextResponse.json({ message: 'User created' }, { status: 201 });
    } catch (err) {
      console.log(err);
      return NextResponse.json(
        { message: 'Internal Server Error' },
        { status: 500 }
      );
    }
  }

  if (eventType === 'session.created') {
    try {
      const { user_id } = evnt?.data;

      // @ts-ignore
      await getUser(user_id);

      return NextResponse.json({ message: 'User found' }, { status: 200 });
    } catch (err) {
      console.log(err);

      return NextResponse.json(
        { message: 'Internal Server Error' },
        { status: 500 }
      );
    }
  }
};
