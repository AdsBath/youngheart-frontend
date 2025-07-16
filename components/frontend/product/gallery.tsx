"use client";

import { createUrl } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { GridTileImage } from "./grid/tile";

export function Gallery({
    images,
    setSelectedImage,
}: {
    images: { src: string; altText: string }[];
    setSelectedImage: (src: string) => void;
}) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const imageSearchParam = searchParams.get("image");
    const imageIndex = imageSearchParam ? parseInt(imageSearchParam) : 0;

    const nextSearchParams = new URLSearchParams(searchParams.toString());
    const nextImageIndex = (imageIndex + 1) % images?.length;
    nextSearchParams.set("image", nextImageIndex.toString());
    const nextUrl = createUrl(pathname, nextSearchParams);

    const previousSearchParams = new URLSearchParams(searchParams.toString());
    const previousImageIndex =
        imageIndex === 0 ? images?.length - 1 : imageIndex - 1;
    previousSearchParams.set("image", previousImageIndex.toString());
    const previousUrl = createUrl(pathname, previousSearchParams);

    const buttonClassName =
        "h-full px-6 transition-all ease-in-out hover:scale-110 hover:text-black dark:hover:text-white flex items-center justify-center";

    const containerRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: "50%", y: "50%" });
    const [scale, setScale] = useState(1);
    const [lastTap, setLastTap] = useState(0);
    const [touchStart, setTouchStart] = useState<{
        x: number;
        y: number;
    } | null>(null);
    const [initialDistance, setInitialDistance] = useState(0);

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

    const resetZoom = () => {
        setScale(1);
        setPosition({ x: "50%", y: "50%" });
    };

    const handleTouchStart = (e: any) => {
        if (e.touches?.length === 2) {
            // Pinch start
            const distance = getDistance(e.touches[0], e.touches[1]);
            setInitialDistance(distance);
        } else if (e.touches?.length === 1) {
            const touch = e.touches[0];
            setTouchStart({ x: touch.clientX, y: touch.clientY });

            // Handle double-tap
            const currentTime = Date.now();
            if (currentTime - lastTap < 300) {
                setScale((prevScale) => (prevScale === 1 ? 2 : 1));
                setPosition({ x: "50%", y: "50%" });
            }
            setLastTap(currentTime);
        }
    };

    const handleTouchMove = (e: any) => {
        if (e.touches?.length === 2 && initialDistance) {
            // Pinch zoom
            const distance = getDistance(e.touches[0], e.touches[1]);
            const newScale = Math.min(
                Math.max((distance / initialDistance) * 1, 1),
                3
            ); // Clamp scale between 1 and 3
            setScale(newScale);
        }
    };

    const handleTouchEnd = () => {
        setInitialDistance(0);
        setTouchStart(null);
    };

    const getDistance = (touch1: Touch, touch2: Touch) => {
        const dx = touch1.clientX - touch2.clientX;
        const dy = touch1.clientY - touch2.clientY;
        return Math.sqrt(dx * dx + dy * dy);
    };

    useEffect(() => {
        setSelectedImage(images[imageIndex]?.src);
    }, [imageIndex, images, setSelectedImage]);

    return (
        <>
            <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden">
                {images[imageIndex] && (
                    <div
                        ref={containerRef}
                        onMouseMove={handleMouseMove}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                        className="relative overflow-hidden h-full rounded-lg"
                    >
                        <Image
                            alt={images[imageIndex]?.altText || "Gallery image"}
                            src={images[imageIndex]?.src}
                            fill
                            className="object-contain transition-transform cursor-zoom-in duration-300 ease-in-out"
                            style={{
                                transform: `scale(${scale})`,
                                transformOrigin: `${position.x} ${position.y}`,
                            }}
                        />
                    </div>
                )}

                {/* {images.length > 1 && (
          <div className="absolute bottom-[15%] flex w-full justify-center">
            <div className="mx-auto flex h-11 items-center rounded-full border border-white bg-neutral-50/80 text-neutral-500 backdrop-blur dark:border-black dark:bg-neutral-900/80">
              <Link
                aria-label="Previous image"
                href={previousUrl}
                className={buttonClassName}
                scroll={false}
              >
                <ArrowLeftIcon className="h-5" />
              </Link>
              <div className="mx-1 h-6 w-px bg-neutral-500"></div>
              <Link
                aria-label="Next image"
                href={nextUrl}
                className={buttonClassName}
                scroll={false}
              >
                <ArrowRightIcon className="h-5" />
              </Link>
            </div>
          </div>
        )} */}
            </div>
            {images?.length > 1 && (
                <ul className="my-12 flex items-center justify-center gap-2 overflow-auto py-1 lg:mb-0">
                    {images?.map((image, index) => {
                        const isActive = index === imageIndex;
                        const imageSearchParams = new URLSearchParams(
                            searchParams.toString()
                        );
                        imageSearchParams.set("image", index.toString());
                        return (
                            <li key={image.src} className="h-20 w-20">
                                <Link
                                    aria-label={`View image ${index + 1}`}
                                    href={createUrl(
                                        pathname,
                                        imageSearchParams
                                    )}
                                    scroll={false}
                                    className="h-full w-full"
                                >
                                    <GridTileImage
                                        alt={image.altText}
                                        src={image.src}
                                        width={80}
                                        height={80}
                                        active={isActive}
                                    />
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            )}
        </>
    );
}
