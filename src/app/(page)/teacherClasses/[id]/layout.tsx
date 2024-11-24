import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import TeacherNavigationMenu from "../components/teacherHeader";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <TeacherNavigationMenu />
            <div className="flex flex-1 flex-row mt-4">
                <div className="overflow-x-hidden flex flex-1 flex-col items-center">
                    {children}
                </div>
            </div>
        </>
    );
}
