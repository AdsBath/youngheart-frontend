"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function TrackAnimation() {
    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
        setWindowWidth(window.innerWidth);
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="w-full h-[500px] bg-gradient-to-b from-sky-300 to-sky-100 overflow-hidden relative">
            {/* Message */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <h1 className="text-3xl font-bold text-gray-800">
                    Thank you for your order!
                </h1>
                <p className="text-lg text-gray-800">
                    Your order is on the way.
                </p>
            </div>

            {/* Sun */}
            <div className="absolute top-8 right-12 w-16 h-16 bg-yellow-300 rounded-full" />
            {/* Clouds */}
            <motion.div
                className="absolute top-12 left-1/4 w-[250px] h-[100px] "
                animate={{ x: [0, 50, 0] }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                <img
                    src="/realistic-white-cloud-png.webp"
                    alt="Cloud"
                    className="w-full h-full object-contain"
                />
            </motion.div>
            <motion.div
                className="absolute top-24 right-1/3 w-[250px] h-[100px]"
                animate={{ x: [0, -70, 0] }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                <img
                    src="/realistic-white-cloud-png.webp"
                    alt="Cloud"
                    className="w-full h-full object-contain"
                />
            </motion.div>

            {/* Road */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gray-700" />

            {/* Road markings */}
            <div className="absolute bottom-12 left-0 right-0 h-2 flex justify-around items-center">
                {[...Array(20)]?.map((_, i) => (
                    <motion.div
                        key={i}
                        className="w-16 h-2 bg-yellow-400"
                        initial={{ x: windowWidth }}
                        animate={{ x: -windowWidth }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "linear",
                            delay: i * 0.25,
                        }}
                    />
                ))}
            </div>

            {/* Truck */}
            <motion.div
                className="absolute bottom-10 w-48 h-32"
                initial={{ x: -200 }}
                animate={{ x: windowWidth }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                }}
            >
                <img
                    src="/product-delivery.png"
                    alt="Delivery Truck"
                    className="w-full h-full object-contain"
                />
            </motion.div>
        </div>
    );
}
