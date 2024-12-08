import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Gamepad2, Monitor } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    // <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    //   <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
    //     <Image
    //       className="dark:invert"
    //       src="/next.svg"
    //       alt="Next.js logo"
    //       width={180}
    //       height={38}
    //       priority
    //     />
    //     <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
    //       <li className="mb-2">
    //         Get started by editing{" "}
    //         <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
    //           src/app/page.tsx
    //         </code>
    //         .
    //       </li>
    //       <li>Save and see your changes instantly.</li>
    //     </ol>

    //     <div className="flex gap-4 items-center flex-col sm:flex-row">
    //       <a
    //         className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
    //         href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         <Image
    //           className="dark:invert"
    //           src="/vercel.svg"
    //           alt="Vercel logomark"
    //           width={20}
    //           height={20}
    //         />
    //         Deploy now
    //       </a>
    //       <a
    //         className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
    //         href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         Read our docs
    //       </a>
    //     </div>
    //   </main>
    //   <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
    //     <a
    //       className="flex items-center gap-2 hover:underline hover:underline-offset-4"
    //       href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <Image
    //         aria-hidden
    //         src="/file.svg"
    //         alt="File icon"
    //         width={16}
    //         height={16}
    //       />
    //       Learn
    //     </a>
    //     <a
    //       className="flex items-center gap-2 hover:underline hover:underline-offset-4"
    //       href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <Image
    //         aria-hidden
    //         src="/window.svg"
    //         alt="Window icon"
    //         width={16}
    //         height={16}
    //       />
    //       Examples
    //     </a>
    //     <a
    //       className="flex items-center gap-2 hover:underline hover:underline-offset-4"
    //       href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <Image
    //         aria-hidden
    //         src="/globe.svg"
    //         alt="Globe icon"
    //         width={16}
    //         height={16}
    //       />
    //       Go to nextjs.org →
    //     </a>
    //   </footer>
    // </div>
    <div>
      {/* header starts */}
      <div className="w-full sm:pr-4 sm:pl-4 flex items-center justify-between border-b border-primary/50 fixed bg-inherit bg-white top-0 z-100">
        <div className="flex gap-4 items-center overflow-x-auto overflow-y-hidden">
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
        <div className="flex flex-col sm:flex-row justify-center items-center">
          <Button variant="outline" className="sm:mr-2 m-1">
            <Link href="login">Log in</Link>
          </Button>
          <Button className="sm:ml-2 m-1">
            <Link href="signup">Register</Link>
          </Button>
        </div>
      </div>
      {/* header ends */}

      {/* body starts */}
      <div className="mt-10 flex flex-col items-center justify-center p-10 bg-blue-200 z-0">
        <div className="flex flex-col sm:flex-row justify-around items-center p-5">
          <div className="pr-8 space-y-4 mt-5 mb-5">
            <h1 className="font-bold text-3xl">Enhance your teaching with Virtual Class</h1>
            <h2>Create and manage your virtual classes in order to be able to teach from anywhere and anytime.</h2>
            <Button className="font-semibold">
              <Link href="signup">Let's get started!</Link>
            </Button>
          </div>
          <div className="flex items-center justify-center sm:pl-8">
            <Image src="/study_img.jpg" alt="study image" width={500} height={500} />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center p-10">
        <h1 className="font-bold text-3xl w-full text-center">All The Tools That You May Love</h1>
        <h2 className="text-center pt-5">We support all of the tools which may be useful for your teaching job in online classes</h2>

        <div className="mt-10 flex sm:grid sm:grid-cols-3 flex-col">
          <Card className="flex flex-col items-center justify-center mb-5 sm:mb-0 sm:ml-5 sm:mr-5 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-col items-center">
              <CardTitle className="text-2xl text-center">Manage Classes</CardTitle>
              <GraduationCap size={100} />
            </CardHeader>
            <CardContent>
              <h2 className="text-center">Keep track on your class progress</h2>
            </CardContent>
          </Card>
          <Card className="flex flex-col items-center justify-center mb-5 sm:mb-0 sm:ml-5 sm:mr-5 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-col items-center">
              <CardTitle className="text-2xl text-center">Gamification</CardTitle>
              <Gamepad2 size={100} />
            </CardHeader>
            <CardContent>
              <h2 className="text-center">A modern way to keep your student motivated</h2>
            </CardContent>
          </Card>
          <Card className="flex flex-col items-center justify-center mb-5 sm:mb-0 sm:ml-5 sm:mr-5 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-col items-center">
              <CardTitle className="text-2xl text-center">Presentation</CardTitle>
              <Monitor size={100} />
            </CardHeader>
            <CardContent>
              <h2 className="text-center">Live screen sharing to keep in touch with your students</h2>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="p-10 sm:p-20">
        <h1 className="font-bold text-2xl pb-4">Frequently Asked Question</h1>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-bold text-md">How can I create a new Class?</AccordionTrigger>
            <AccordionContent>
              It's very easy, all the prerequisite is that you are required to sign in to our website as a teacher role.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="font-bold text-md">How can my students log into the Class?</AccordionTrigger>
            <AccordionContent>
              They would need to create an account with Student role. In Classes tab, select "Join" and enter class code to join a new class.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="font-bold text-md">Is this free?</AccordionTrigger>
            <AccordionContent>
              Yes, it's totally free. Our dedication is to bring education to everyone.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      {/* body ends */}

      <div className="flex flex-col sm:flex-row justify-normal sm:justify-around items-center pt-5 bg-green-100">
        <div className="flex flex-col justify-center items-center pb-5">
          <div className="font-bold text-[24px] text-primary">
            My<span className="text-accent">Classes</span>
          </div>
          <Image
            src="/elearning_pic.jpg"
            alt="logo"
            width={63}
            height={36}
            quality={100}
          />
        </div>
        <div className="flex flex-col sm:justify-normal justify-center sm:items-start items-center pb-5">
          <h2 className="font-bold text-xl">Services</h2>
          <h3>Classes</h3>
          <h3>Gamification</h3>
          <h3>Presentation</h3>
        </div>
        <div className="flex flex-col sm:justify-normal justify-center sm:items-start items-center pb-5">
          <h2 className="font-bold text-xl">Company</h2>
          <h3>About us</h3>
          <h3>Privacy Policy</h3>
          <h3>Terms of Service</h3>
        </div>
      </div>
    </div>
  );
}
