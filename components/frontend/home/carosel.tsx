"use client";
import useEmblaCarousel from "embla-carousel-react";
import React, { useCallback, useEffect, useState } from "react";
import "./EmblaCarousel.css";

const EmblaCarousel: React.FC = () => {
    const [viewportRef, embla] = useEmblaCarousel({
        align: "start", // Align slides to the start of the viewport
        slidesToScroll: 1, // Number of slides to scroll at a time
    });

    const [slidesToShow, setSlidesToShow] = useState(1);

    const handleResize = useCallback(() => {
        // Change slidesToShow dynamically based on screen size
        const width = window.innerWidth;
        if (width >= 1024) {
            setSlidesToShow(4); // Show 4 slides on large screens
        } else if (width >= 768) {
            setSlidesToShow(2); // Show 2 slides on medium screens
        } else {
            setSlidesToShow(1); // Show 1 slide on small screens
        }
    }, []);

    useEffect(() => {
        handleResize(); // Set initial value on component mount
        window.addEventListener("resize", handleResize); // Listen to window resize
        return () => window.removeEventListener("resize", handleResize); // Cleanup
    }, [handleResize]);

    // Add dynamic styles for embla__container to reflect slidesToShow
    const slideStyle = {
        flex: `0 0 ${100 / slidesToShow}%`, // Divide container width by slidesToShow
    };

    const slides = [
        "Slide 1",
        "Slide 2",
        "Slide 3",
        "Slide 4",
        "Slide 5",
        "Slide 6",
    ]; // Example slides

    return (
        <div className="embla">
            <div className="embla__viewport" ref={viewportRef}>
                <div className="embla__container">
                    {slides?.map((slide, index) => (
                        <div
                            className="embla__slide"
                            key={index}
                            style={slideStyle}
                        >
                            <div className="embla__slide__inner">{slide}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EmblaCarousel;
