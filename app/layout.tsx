import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google"
import { cn } from "../lib/utils";
import Navbar from "../components/Navbar";
import Providers from "../components/Providers";


const inter = Inter({ subsets: ["latin"] });


const metadata: Metadata = {
  title: "PhysioMedicine",
  description: "PhysioPure is dedicated to exploring the science of physiology, offering readers in-depth insights into how the human body functions. From explaining the basics of organ systems to discussing the latest research in the field, the blog aims to make complex biological concepts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className="h-full">
      <body className={cn("relative h-full font-sans antialiased", inter.className)}>
        <main className="relative flex flex-col min-h-screen">
          <Providers>
            <Navbar />
            <div className="flex-grow flex-1">{children}</div>
          </Providers>
        </main>
      </body>
    </html>
  );
}
