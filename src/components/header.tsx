"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

export default function Header() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      console.log("Starting logout process");

      const response = await axios.post("/api/logout", {}, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log("Logout response:", response);

      if (response.status === 200) {
        router.push("/login");
      }
    } catch (error) {
      // Ghi lại chi tiết lỗi
      console.error("Detailed Logout error:", error);
      setIsLoading(false);
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
        <Button variant={"outline"} onClick={handleLogout}>
          {isLoading ? "Logging Out ..." : "Log Out"}
        </Button>
      </div>
    </div>
  );
}

