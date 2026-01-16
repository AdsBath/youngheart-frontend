"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";
import { GridTileImage } from "./grid/tile";

export function Gallery({
    images = [],
    setSelectedImage,
}: {
    images?: { src: string; altText: string }[];
    setSelectedImage: (src: string) => void;
}) {
    const [activeIndex, setActiveIndex] = useState(0);
    const imageCount = images.length;

    const containerRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: "50%", y: "50%" });
    const [scale, setScale] = useState(1);
    const [lastTap, setLastTap] = useState(0);
    const [initialDistance, setInitialDistance] = useState(0);

    const resetZoom = useCallback(() => {
        setScale(1);
        setPosition({ x: "50%", y: "50%" });
    }, []);

    useEffect(() => {
        if (!imageCount) return;

        setActiveIndex((index) => {
            if (index >= imageCount) {
                return 0;
            }
            return index;
        });
    }, [imageCount]);

    useEffect(() => {
        if (!imageCount) return;
        if (activeIndex >= imageCount) {
            setActiveIndex(0);
            return;
        }

        setSelectedImage(images[activeIndex]?.src);
        resetZoom();
    }, [activeIndex, imageCount, images, setSelectedImage, resetZoom]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current || scale === 1) return;

        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        setPosition({ x: `${x}%`, y: `${y}%` });
    };

    const handleMouseEnter = () => {
        setScale(2);
    };

    const handleMouseLeave = () => {
        resetZoom();
    };

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        if (e.touches?.length === 2) {
            const distance = getDistance(e.touches[0], e.touches[1]);
            setInitialDistance(distance);
        } else if (e.touches?.length === 1) {
            const currentTime = Date.now();
            if (currentTime - lastTap < 300) {
                setScale((prevScale) => (prevScale === 1 ? 2 : 1));
                setPosition({ x: "50%", y: "50%" });
            }
            setLastTap(currentTime);
        }
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        if (e.touches?.length === 2 && initialDistance) {
            const distance = getDistance(e.touches[0], e.touches[1]);
            const newScale = Math.min(Math.max((distance / initialDistance) * 1, 1), 3);
            setScale(newScale);
        }
    };

    const handleTouchEnd = () => {
        setInitialDistance(0);
    };

    const getDistance = (touch1: React.Touch, touch2: React.Touch) => {
        const dx = touch1.clientX - touch2.clientX;
        const dy = touch1.clientY - touch2.clientY;
        return Math.sqrt(dx * dx + dy * dy);
    };

    const handleSelectImage = (index: number) => {
        setActiveIndex(index);
    };

    return (
        <>
            <div className="relative aspect-square h-full max-h-[600px] w-full overflow-hidden">
                {images[activeIndex] && (
                    <div
                        ref={containerRef}
                        onMouseMove={handleMouseMove}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                        className="relative overflow-hidden h-full rounded-b-lg"
                    >
                        <Image
                            alt={images[activeIndex]?.altText || "Gallery image"}
                            src={images[activeIndex]?.src}
                            fill
                            className="object-cover transition-transform cursor-zoom-in duration-300 ease-in-out"
                            style={{
                                transform: `scale(${scale})`,
                                transformOrigin: `${position.x} ${position.y}`,
                            }}
                        />
                    </div>
                )}
            </div>
            {imageCount > 1 && (
                <ul className="my-3 flex items-center justify-start gap-2  py-1 lg:mb-0">
                    {images.map((image, index) => {
                        const isActive = index === activeIndex;

                        return (
                            <li key={`${image.src}-${index}`} className="h-20 w-20">
                                <button
                                    type="button"
                                    aria-label={`View image ${index + 1}`}
                                    onClick={() => handleSelectImage(index)}
                                    className="h-full w-full focus:outline-none"
                                >
                                    <GridTileImage
                                        alt={image.altText}
                                        src={image.src}
                                        width={80}
                                        height={80}
                                        active={isActive}
                                    />
                                </button>
                            </li>
                        );
                    })}
                </ul>
            )}
        </>
    );
}
