import * as fs from "node:fs/promises";
import { getPlaiceholder } from "plaiceholder";

export async function getImageData(src: string) {
  const buffer = await fs.readFile(`./public${src}`);
  const { base64 } = await getPlaiceholder(buffer);
  return { src, blurDataURL: base64 };
}
