import { BASE_URL } from "@/utils/base-url";

const DEFAULT_TIMEOUT_MS = 8000;

const fetchWithTimeout = async (
  input: RequestInfo | URL,
  init?: RequestInit & { timeout?: number }
) => {
  const controller = new AbortController();
  const timeout = init?.timeout ?? DEFAULT_TIMEOUT_MS;
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(input, {
      ...init,
      signal: controller.signal,
    });

    return response;
  } finally {
    clearTimeout(timeoutId);
  }
};

export async function fetchProductData(slug: string) {
  if (!slug) return null;

  try {
    const res = await fetchWithTimeout(`${BASE_URL}/products/get/${slug}`, {
      next: { revalidate: 30 },
      cache: "no-store",
      timeout: DEFAULT_TIMEOUT_MS,
    });

    if (!res.ok) {
      return null;
    }

    return await res.json();
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Failed to fetch product data:", error);
    }
    return null;
  }
}
