'use client'

import { Stethoscope } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { trpc } from "../trpc/client";
import { buttonVariants } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const handleDashboard = () => {
    router.push("/admin")
  };

  const { data: Categories } = trpc.getCategories.useQuery()
  const handleClick = (name: string, id: number) => {
    router.push(`/category/${name} ? id = ${id}`);
    setIsOpen(false);
  }

  return (
    <div className="flex justify-center z-50 bg-white">
      <nav className="flex rounded-lg shadow-md p-2 px-4 justify-between w-1/2">
        <div className="flex gap-1 mt-1">
          <Stethoscope className="mt-1" />
          <h2 className="font-semibold text-lg cursor-pointer" onClick={() => router.push("/")}>PhysioMedicine</h2>
        </div>
        <div className="flex gap-2 justify-end">
          {/* Categories bar */}
          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger
              className="outline-none pr-2 cursor-pointer"
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
              asChild
            >
              <h2 className="cursor-pointer mt-2 font-semibold pr-2 sm:hidden lg:block">Categories</h2>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-0">
              <div className="grid grid-cols-2 gap-2 p-2">
                {Categories?.map((category, index) => (
                  <DropdownMenuItem
                    key={index}
                    onMouseEnter={() => setIsOpen(true)}
                    onMouseLeave={() => setIsOpen(false)}>
                    <h2 className="text-sm font-normal hover:cursor-pointer" onClick={() => handleClick(category.name, category.id)}>
                      {category.name}
                    </h2>
                  </DropdownMenuItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>


          <div
            className={`hover:cursor-pointer ${buttonVariants({ variant: "outline" })}`}
            onClick={handleDashboard}
          >
            Dashboard
          </div>
        </div>
      </nav >
    </div >
  );
};

export default Navbar;