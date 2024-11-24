"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface NavigationItem {
    name: string;
    href: string;
}

const TeacherNavigationMenu: React.FC = () => {
    const router = useRouter(); // Sử dụng router của Next.js
    const [activeItem, setActiveItem] = useState("/teacherClasses/1");

    const navigation: NavigationItem[] = [
        { name: "Participant", href: "/teacherClasses/1" },
        { name: "Live Class", href: "/products" },
        { name: "Groups", href: "/services" },
        { name: "Materials", href: "/news" },
        { name: "Reports", href: "/contact" },
        { name: "Settings", href: "/about" },
    ];

    const classNames = (...classes: string[]) => {
        return classes.filter(Boolean).join(" ");
    };

    const handleClick = (href: string) => {
        setActiveItem(href);
        router.push(href); // Điều hướng tới URL mới
    };

    return (
        <div className="w-full border-b border-gray-300 overflow-x-auto pt-2">
            <div className="flex h-14 items-center px-4 min-w-max">
                <nav className="flex items-center space-x-6">
                    {navigation.map((item) => (
                        <button
                            key={item.href}
                            onClick={() => handleClick(item.href)}
                            className={classNames(
                                "flex items-center text-sm font-medium transition-colors hover:text-green-600 h-14 border-b-2 pl-2 pr-2",
                                activeItem === item.href
                                    ? "border-green-600 text-green-600"
                                    : "border-transparent text-gray-500 hover:border-gray-300"
                            )}
                        >
                            {item.name}
                        </button>
                    ))}
                </nav>
            </div>
        </div>
    );
};

export default TeacherNavigationMenu;
