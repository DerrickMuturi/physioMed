import Link from "next/link";
import ArticleBox from "../components/ArticleBox";
import Footer from "../components/Footer";
import { cn } from "../lib/utils";
import { buttonVariants } from "../components/ui/button";
import { Stethoscope } from "lucide-react";


export default function Home() {
  return (
    <div className="h-screen max-h-screen py-20 mx-auto flex flex-col  sm:overflow-x-hidden md:overflow-x-visible">
      <div className="flex flex-col items-center">
        <h1 className={cn("text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mt-7 text-center max-w-3xl")}>
          Empower Your Movement, Transform Your Health.
        </h1>
        <p className="mt-6 text-lg text-muted-foreground text-center max-w-2xl">
          Discover expert tips, treatments, and exercises
          designed to help you move better,live pain-free,
          and achieve lasting well-being.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 mt-6 animate-fade sm:mb-24 lg:mb-32">
        <ArticleBox />
      </div>


      <div className="mt-20 grid grid-cols-2 lg:space-x-20 bg-destructive sm:mx-14 lg:mx-36 p-5 rounded-lg items-start">
        <div className="flex items-start flex-col space-y-5">
          <p className="text-xl text-white max-w-xl">Read about real-life challenges faced by individuals overcoming injuries and the strategies they used to prevent setbacks and promote healing.</p>
          <Link href="/all" className={`pb-7 text-left mt-10${buttonVariants({ variant: "outline" })}`}>
            View All Posts
          </Link>
        </div>
        <div>
          <Stethoscope className="ml-28 sm:w-32 sm:h-32 lg:ml-80" />
        </div>
      </div>
      <div className="mt-56 border-t-2 border-gray-100 p-3 pt-7 rounded-t-lg">
        <Footer />
      </div>
    </div>
  );
}
