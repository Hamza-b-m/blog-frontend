"use client";
import BackArrow from "@/assets/svg/BackArrow.svg";
import IsLoadingUi from "@/components/IsLoadingUi";
import NotFoundUi from "@/components/NotFoundUi";
import api from "@/services";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function BlogDetailClient({ id }: { id: string }) {
  const router = useRouter();
  const {
    data: blog,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blog", id],
    queryFn: api.blog.findOne(id),
    retry: 0,
  });

  const handleClickGoBack = () => router.back();

  if (isLoading) {
    return <IsLoadingUi />;
  }

  if (error && (error as AxiosError).response?.status === 404) {
    return <NotFoundUi />;
  }

  if (error) {
    throw error;
  }

  return (
    <main className="p-4">
      <div className="w-full max-w-[1020px] mx-auto">
        <button
          type="button"
          className="bg-gray-100 hover:bg-gray-200 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 w-10 h-10 transition-colors duration-300"
          onClick={handleClickGoBack}
        >
          <BackArrow />
        </button>
        <h1 className="text-3xl my-4 font-medium">{blog?.title}</h1>
        <div className="flex items-center mb-6 gap-1">
          <Image
            width={40}
            height={40}
            src="https://img.icons8.com/office/40/circled-user-male-skin-type-3.png"
            alt="avatar"
          />
          <p className="flex-1 min-w-0 ms-4 text-sm font-medium text-gray-900 truncate max-w-[150px]">
            {blog?.author}
          </p>
        </div>
        <p className="text-lg">{blog?.content}</p>
      </div>
    </main>
  );
}
