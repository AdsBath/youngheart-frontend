"use client";

import { Button } from "@/components/custom/button";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { FaHeadset } from "react-icons/fa";
import SocialMediaContainer from "./SocialMediaContainer";

const SocialMediaButton = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="fixed right-4 bottom-24 md:bottom-16">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className={`transition-all bg-brand duration-300 text-white px-4 flex items-center justify-between ${
              !isScrolled ? "h-12 rounded-md" : "h-16 w-16 rounded-md"
            }`}
          >
            <FaHeadset
              className={`text-white font-bold ${
                isScrolled ? "h-16 w-16" : "h-8 w-8"
              }`}
            />
            {isScrolled ? null : <span className="ml-2">Help</span>}
          </Button>
        </DialogTrigger>
        <SocialMediaContainer />
      </Dialog>
    </div>
  );
};

export default SocialMediaButton;
