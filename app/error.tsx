"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4">
      <div className="max-w-md w-full  rounded-lg p-6 text-center">
        <h2 className="text-5xl font-bold text-red-500 mb-4">500</h2>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Oops! Something went wrong.
        </h3>
        <p className="text-gray-600 mb-4">
          We encountered an unexpected error. Please try again or return to the
          homepage.
        </p>

        <div className="flex justify-center space-x-4">
          <Button variant={"delete"} onClick={() => reset()}>
            Try Again
          </Button>

          <Link
            href="/"
            className="px-4 py-2 bg-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-400 transition duration-200"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
