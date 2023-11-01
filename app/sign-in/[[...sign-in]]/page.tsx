import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="row min-h-screen flex items-center pt-[50px] justify-center">
      <SignIn />;
    </div>
  );
}
