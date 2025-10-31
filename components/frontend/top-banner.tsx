"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";

export default function TopBanner() {
  const messages = [
    "Free Shipping on Orders Above ৳5,000",
    "We Deliver Dreams with Trust and Commitment",
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 3000); // flips every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-black text-white text-xs"
    >
      <div className="px-4 sm:px-6 md:px-16 py-2 flex justify-between items-center">
        {/* Left side */}
        <div className="hidden md:flex items-center space-x-2 hover:text-orange-300 transition-colors cursor-pointer">
          <MapPin className="h-3 w-3" />
          <span>Find a Store</span>
        </div>

        {/* Center flip text */}
        <div className="relative h-4 overflow-hidden font-semibold uppercase text-center">
          <AnimatePresence mode="wait">
            <motion.span
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="block"
            >
              {messages[index]}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-2">
          <span>BANGLADESH</span>
          <div className="w-4 h-3 bg-green-600 relative rounded-sm overflow-hidden">
            <div className="absolute inset-0 bg-red-600 rounded-full w-3 h-3 left-0.5 top-0"></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
