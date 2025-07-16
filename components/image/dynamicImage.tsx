import Image from "next/image";
import { getPlaiceholder } from "plaiceholder";

export default async function DynamicImage() {
  const src =
    "https://images.unsplash.com/photo-1621961458348-f013d219b50c?auto=format&fit=crop&w=1000&q=80";
  const buffer = await fetch(src).then(async (res) => {
    return Buffer.from(await res.arrayBuffer());
  });

  const { base64 } = await getPlaiceholder(buffer);

  return (
    <div className="">
      <p>Dynamic Plaiceholder Blur</p>
      <div
        className="border-b relative h-[300px] w-[300px] overflow-hidden rounded-lg"
      >
        <Image
          src={src}
          fill
          alt="image"
          placeholder="blur"
          blurDataURL={base64}
          loading="lazy"
          className="w-full object-cover"
        />
      </div>
    </div>
  );
}
