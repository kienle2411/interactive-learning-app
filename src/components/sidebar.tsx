"use client";

import { Gamepad2, Settings, LibraryBig } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MenuItemProps {
  icon: React.ReactNode;
  title: string;
  path: string;
}

function MenuItem({ icon, title, path }: MenuItemProps) {
  const currentPath = usePathname();
  const isActive = currentPath.includes(path);

  if (isActive) {
    return (
      <Link href={path}>
        <div className="flex items-center p-[10px] space-x-[10px] text-white text-[14px] w-[200px] bg-primary rounded-[5px]">
          <span>{icon}</span>
          <span className="leading-6">{title}</span>
        </div>
      </Link>
    );
  }
  return (
    <Link href={path}>
      <div className="flex items-center p-[10px] space-x-[10px] text-white text-[14px] w-[200px] hover:bg-foreground/20 hover:rounded-md ">
        <span>{icon}</span>
        <span className="leading-6">{title}</span>
      </div>
    </Link>
  );
}

export default function Sidebar() {
  return (
    <div className="w-60 h-[900px] bg-green-600 fixed">
      <div className="p-5 gap-y-3 border-b border-[#FCFCFC]/[40]">
        <MenuItem
          icon={<LibraryBig />}
          title="Classes"
          path="/teacherClasses"
        />
        <MenuItem icon={<Gamepad2 />} title="Games" path="/teacherGames" />
      </div>

      <div className="p-5 gap-y-3 ">
        <MenuItem icon={<Settings />} title="Settings" path="/settingsTab" />
      </div>
    </div>
  );
}
