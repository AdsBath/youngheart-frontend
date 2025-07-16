import { cn } from "@/lib/utils";
import Image from "next/image";
import { getImageData } from "./fileUtils";


export default function StaticImage() {
  const src = "/pexels-gabriel-peter-219375-719396.jpg";
  const { src: imageSrc, blurDataURL } : any = getImageData(src);

  return (
    <div className="w-[500px] h-[400px]">
      <p>Static Plaiceholder blur</p>
      <div
        className={cn(
          "border-b relative h-[300px] w-[300px] overflow-hidden rounded-lg"
        )}
      >
        <Image
          src={imageSrc.replace("./public", "")}
          fill
          alt="image"
          placeholder="blur"
          blurDataURL={blurDataURL}
          className="w-full object-cover"
        />
      </div>
    </div>
  );
}
