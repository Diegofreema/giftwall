import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="row min-h-screen flex items-center pt-[50px] justify-center">
      <SignUp />
    </div>
  );
}
