import { authMiddleware } from '@clerk/nextjs';

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  ignoredRoutes: [
    '/',
    '/blog',
    '/event',
    '/blog',
    '/blog/(.*)',
    '/event/(.*)',
    '/api/webhook',
    '/services/girl-child-education',
    '/services/empowerment',
    '/services/good-health-for-women',
    '/services/food-outreach',
    '/services',
    '/about-us',
    '/about-us/become-a-volunteer',
    '/about-us/our-priorities',
    '/about-us/our-team',
    '/bmwf-projects',
    '/faq',
    '/gallery/image',
    '/gallery/video',
    '/bmwf-projects/clean-healthy-girl',
    '/bmwf-projects/street-to-classroom',
    '/bmwf-projects/feed-one-feed-all',
    '/donate'
  ],
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
