"use client";
import Image from "next/image";
import {
    Gamepad2,
    Settings,
    LibraryBig

} from "lucide-react";
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
                <div className="grid-cols-1 flex flex-col text-sm items-center justify-center bg-primary rounded ml-1 mr-1 p-2">
                    <span>{icon}</span>
                    <span>{title}</span>
                </div>
            </Link>
        );
    }
    return (
        <Link href={path}>
            <div className="grid-cols-1 flex flex-col text-sm items-center justify-center hover:bg-foreground/20 rounded ml-1 mr-1 p-2">
                <span>{icon}</span>
                <span>{title}</span>
            </div>
        </Link>
    );
}

export default function StudentFooter() {
    return (
        <div className="w-full absolute flex items-center justify-between border-t border-primary/50 bg-inherit bottom-0 z-10">
            <div className="grid grid-cols-3 w-full pt-1 pb-1 bg-green-600 text-white">
                <MenuItem icon={<LibraryBig />} title="Classes" path="/studentClasses" />
                <MenuItem icon={<Gamepad2 />} title="Games" path="/studentGames" />
                <MenuItem icon={<Settings />} title="Settings" path="/studentSettings" />
            </div>
        </div>
    );
}
