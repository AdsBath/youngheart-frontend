import { BASE_URL } from "@/utils/base-url";

export async function fetchProductData(slug: string) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 5 seconds timeout

    const res = await fetch(`${BASE_URL}/products/get/${slug}`, {
      next: {
        revalidate: 30,
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Error ${res.status}: ${errorText}`);
      throw new Error(`Failed to fetch product data, status: ${res.status}`);
    }

    const data = await res.json();

    return data;
  } catch (error: any) {
    console.log({ error });
    if (error.name === "AbortError") {
      console.error("Fetch request timed out.");
    } else {
      console.error("Error fetching product data:", error.message);
    }
    // throw new Error("Product data fetching error.");
  }
}
