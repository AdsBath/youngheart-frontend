"use client";
import { useEffect, useState } from "react";
interface LocalStorageProps<T> {
  key: string;
  defaultValue: T;
}

export default function useLocalStorage<T>({
  key,
  defaultValue,
}: LocalStorageProps<T>) {
  const [value, setValue] = useState<T>(() => {
    const storedValue =
      typeof window !== "undefined" ? window.localStorage.getItem(key) : null;
    return storedValue !== null ? (JSON.parse(storedValue) as T) : defaultValue;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  }, [value, key]);

  return [value, setValue] as const;
}

// export default function useLocalStorage<T>({
//   key,
//   defaultValue,
// }: LocalStorageProps<T>) {
//   const [value, setValue] = useState<T>(() => {
//     const storedValue =
//       typeof window !== "undefined" ? window.localStorage.getItem(key) : null;
//     return storedValue !== null ? (JSON.parse(storedValue) as T) : defaultValue;
//   });

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       window.localStorage.setItem(key, JSON.stringify(value));
//     }
//   }, [value, key]);

//   return [value, setValue] as const;
// }
