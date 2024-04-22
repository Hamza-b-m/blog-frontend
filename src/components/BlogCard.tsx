import { Blog } from "@/types/blog.type";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import VoteContainer from "./VoteContainer";
import BlogCardDeleteBtn from "./BlogCardDeleteBtn";

export default function BlogCard(blog: Blog) {
  let borderColor = "border-gray-200";
  if (blog.upvote > blog.downvote) {
    borderColor = "border-green-500";
  }
  if (blog.upvote < blog.downvote) {
    borderColor = "border-red-500";
  }

  return (
    <div
      className={
        "basis-80 p-4 bg-white border rounded-lg sm:p-3 flex flex-col " +
        borderColor
      }
    >
      <div className="flex items-center mb-3 gap-1">
        <Image
          width={40}
          height={40}
          src="https://img.icons8.com/office/40/circled-user-male-skin-type-3.png"
          alt="avatar"
        />
        <p className="flex-1 min-w-0 ms-4 text-sm font-medium text-gray-900 truncate max-w-[150px]">
          {blog.author}
        </p>
        <BlogCardDeleteBtn {...blog} />
      </div>
      <div className="border-b-2" />
      <div className="pl-1 mt-3 grow flex flex-col">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-gray-900">
          {blog.title}
        </h2>
        <p className="mb-3 text-gray-500 line-clamp-3">{blog.content}</p>
        <div className="mt-auto flex justify-between gap-x-6 gap-y-1 flex-wrap">
          <Link
            href={"/" + blog.id}
            className="inline-flex items-center font-medium text-teal-800 hover:text-teal-900"
          >
            Continue reading
            <svg
              className=" w-2.5 h-2.5 ms-2 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </Link>
          <VoteContainer
            id={blog.id}
            upvote={blog.upvote}
            downvote={blog.downvote}
          />
        </div>
      </div>
    </div>
  );
}
