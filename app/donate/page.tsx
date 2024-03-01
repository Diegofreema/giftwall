import { NextPage } from 'next';
import Link from 'next/link';

interface Props {}

const page: NextPage<Props> = ({}): JSX.Element => {
  return (
    <div className="min-h-screen flex flex-col  items-center justify-center   ">
      <h1 className="font-bold text-3xl text-center text-purple-900">
        Support Us
      </h1>
      <div className="mt-10 min-h-full  flex flex-col items-center justify-center space-y-5">
        <Link
          href={'/donate/africa'}
          className="text-white bg-purple-900 w-[200px] hover:bg-purple-500 transition-all duration-100 text-center px-5 py-3 rounded-md"
        >
          From Africa
        </Link>
        <Link
          href={'/donate/asia'}
          className="text-white bg-yellow-500 w-[200px] hover:bg-yellow-400 transition-all duration-100 text-center px-5 py-3 rounded-md"
        >
          From Europe
        </Link>
      </div>
    </div>
  );
};

export default page;
