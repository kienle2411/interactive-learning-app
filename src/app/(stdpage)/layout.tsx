import Header from "@/components/header";
import StudentFooter from "@/components/stdFooter";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="flex flex-1 flex-row mt-16 overflow-x-hidden overflow-y-auto mb-16">
        {children}
      </div>
      <StudentFooter />
    </>
  );
}
