import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import StudentFooter from "@/components/stdFooter";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header />
            <div className="flex flex-1 flex-row mt-16 bg-blue-400 overflow-x-hidden overflow-y-auto">
                {children}
            </div>
            <StudentFooter />
        </>
    );
}
