 
import Image from "next/image";
import { getBlurData } from "./blur-data-generator";

export default async function Home() {
  const imageUrl =
    "https://images.unsplash.com/photo-1621961458348-f013d219b50c";

  const { base64 } = await getBlurData(imageUrl);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col gap-4 items-center overflow-clip">
        <Image
          src={imageUrl || "/placeholder.png"}
          alt="Sample Image"
          height={465}
          width={700}
          placeholder="blur"
          blurDataURL={base64}
        />
        <h1 className="text-4xl font-medium">Image with blur hash</h1>
      </div>
    </main>
  );
}