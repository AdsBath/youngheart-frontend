"use client";

import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { useMemo } from "react";

import "react-quill/dist/quill.bubble.css";

interface PreviewProps {
  value: string;
  className?: string;
}

export const Preview = ({ value, className }: PreviewProps) => {
  // Import Quill w/o server-side rendering to prevent hydration errors.
  const ReactQuill = useMemo(
    () =>
      dynamic(() => import("react-quill"), {
        ssr: false,
      }),
    []
  );

  return (
    <ReactQuill
      className={cn("text-black min-h-0 ", className)}
      theme="bubble"
      value={value}
      readOnly={true}
    />
  );
};
