import NotFound from "@/assets/svg/NotFound.svg";
import Link from "next/link";
import React from "react";

export default function NotFoundUi() {
  return (
    <main className="p-3 mx-auto max-w-[820px] w-full">
      <h2 className="font-semibold text-2xl text-center my-4 mt-6">
        Sorry, page not found
      </h2>
      <p className="text-center text-lg">Could not find requested resource</p>
      <div className="mt-4 text-center mb-12 sm:mb-1">
        <Link
          href="/"
          className="bg-teal-700 text-white font-medium px-4 py-2 rounded-[4px]"
        >
          Back home
        </Link>
      </div>
      <NotFound />
    </main>
  );
}
