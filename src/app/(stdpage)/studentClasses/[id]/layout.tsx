import StudentNavigationMenu from "../components/studentNavbar";
// import TeacherNavigationMenu from "../components/teacherHeader";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="w-full">
                <StudentNavigationMenu />
                <div className="flex flex-1 flex-row mt-4 w-full pl-4 pr-4">
                    <div className="overflow-x-hidden flex flex-1 flex-col items-center w-full">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}
