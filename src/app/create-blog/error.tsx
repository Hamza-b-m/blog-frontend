"use client";
import ErrorUI from "@/components/ErrorUI";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  const handleReset = () => {
    reset();
  };

  return <ErrorUI onClick={handleReset} />;
}
