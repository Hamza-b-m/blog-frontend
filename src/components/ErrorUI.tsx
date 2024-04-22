import ErrorSvg from "@/assets/svg/ErrorSvg.svg";
import Link from "next/link";
import React from "react";

type ErrorUIProps = {
  onClick: () => void;
};

export default function ErrorUI({ onClick }: ErrorUIProps) {
  return (
    <div className="p-3 mx-auto max-w-[820px] w-full">
      <h2 className="font-semibold text-2xl text-center my-4 mt-6">
        Oops! Something went wrong
      </h2>
      <p className="text-center text-lg">
        You may refresh the page or try again later
      </p>
      <div className="mt-4 flex justify-center gap-6 mb-12 sm:mb-1">
        <button
          className="bg-teal-700 text-white font-medium px-4 py-2 rounded-[4px]"
          onClick={onClick}
        >
          Try again
        </button>
        <Link
          href="/"
          className="font-medium px-4 py-2 rounded-[4px] border-teal-700 border-2"
        >
          Home
        </Link>
      </div>
      <ErrorSvg />
    </div>
  );
}
