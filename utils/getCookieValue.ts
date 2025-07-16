export const getCookieValue = (cookieName: string) => {
  if (typeof window === "undefined") {
    return null; // No cookies available during SSR
  }
  const cookies = document.cookie.split("; ");
  const cookie = cookies.find((c) => c.startsWith(`${cookieName}=`));
  return cookie ? cookie.split("=")[1] : null;
};
