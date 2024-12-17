"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";


export default function Header() {

  const router = useRouter();

  const handleOnClick = () => {
    try {
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      router.push('/login');
    } catch (error) {
      console.log("Error log out: ", error);
    }
  };

  return (
    <div className="w-full pr-4 pl-4 flex items-center justify-between border-b border-primary/50 fixed bg-inherit top-0 z-10">
      <div className="flex gap-4 items-center">
        <Image
          src="/elearning_pic.jpg"
          alt="logo"
          width={63}
          height={36}
          quality={100}
        />
        <div className="font-bold text-[24px] text-primary">
          My<span className="text-accent">Classes</span>
        </div>
      </div>
      <div>
        <Button onClick={handleOnClick} variant={"outline"}>Log Out</Button>
      </div>
    </div>
  );
}
