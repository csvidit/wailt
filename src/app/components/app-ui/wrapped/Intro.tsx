import { auth } from "@/auth";
import { SignOutButton } from "../auth/AuthButtons";

const Intro = async () => {
  const session = await auth();

  return (
    <div className="justify-left w-full flex flex-col gap-4">
      <div className="flex flex-col gap-4 w-fit">
        <div className="text-xl lg:text-2xl font-medium">Hello, {session?.user?.name}</div>
        <SignOutButton />
      </div>
    </div>
  );
};

export default Intro;
