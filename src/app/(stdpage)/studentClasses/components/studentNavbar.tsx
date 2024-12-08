
"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface NavigationItem {
    name: string;
    href: string;
}

const StudentNavigationMenu: React.FC = () => {
    const router = useRouter(); // Sử dụng router của Next.js
    const params = useParams(); // Lấy params từ URL
    const { id } = params; // Lấy `id` từ params
    const [activeItem, setActiveItem] = useState(`/studentClasses/${id}`);

    const navigation: NavigationItem[] = [
        { name: "Participant", href: `/studentClasses/${id}` },
        { name: "Live Class", href: `/products` },
        { name: "Groups", href: `/studentClasses/${id}/classGroup` },
        { name: "Materials", href: `/studentClasses/${id}/classMaterials` },
    ];

    const classNames = (...classes: string[]) => {
        return classes.filter(Boolean).join(" ");
    };

    const handleClick = (href: string) => {
        setActiveItem(href);
        router.push(href); // Điều hướng tới URL mới
    };

    return (
        <div className="w-full border-b border-gray-300 overflow-x-auto pt-1">
            <div className="flex h-12 items-center px-4 min-w-max">
                <nav className="flex items-center space-x-6">
                    {navigation.map((item) => (
                        <button
                            key={item.href}
                            onClick={() => handleClick(item.href)}
                            className={classNames(
                                "flex items-center text-sm font-medium transition-colors hover:text-green-600 h-11 border-b-2 pl-2 pr-2",
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

export default StudentNavigationMenu;
