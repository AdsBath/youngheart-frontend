import { BASE_URL } from "@/utils/base-url";

export async function fetchProductData(slug: string) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 seconds timeout

    const res = await fetch(`${BASE_URL}/products/get/${slug}`, {
      next: {
        revalidate: 30,
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      return null;
    }

    const data = await res.json();

    return data;
  } catch (error: any) {
    return null;
  }
}
