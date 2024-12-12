import TeacherNavigationMenu from "../components/teacherHeader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TeacherNavigationMenu />
      <div className="flex flex-1 flex-row mt-4 w-full pl-4 pr-4">
        <div className="overflow-x-hidden flex flex-1 flex-col items-center w-full">
          {children}
        </div>
      </div>
    </>
  );
}
