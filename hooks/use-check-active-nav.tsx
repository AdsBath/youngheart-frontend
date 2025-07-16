import { usePathname } from "next/navigation";

export default function useCheckActiveNav() {
  const router = usePathname();

  const checkActiveNav = (nav: string) => {
    return router === nav;
  };

  return { checkActiveNav };
}
