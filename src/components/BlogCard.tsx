import { Blog } from "@/types/blog.type";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function BlogCard(blog: Blog) {
  return (
    <div className="basis-80 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-3 flex flex-col">
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
        <div className="flex justify-end ml-auto">
          <button
            id="dropdownButton"
            data-dropdown-toggle="dropdown"
            className="inline-block text-gray-500 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg text-sm p-1.5"
            type="button"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 3"
            >
              <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
            </svg>
          </button>
          <div
            id="dropdown"
            className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
          >
            <ul className="py-2" aria-labelledby="dropdownButton">
              <li>
                <Link
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Edit
                </Link>
              </li>
              <li className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                Delete
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-b-2" />
      <div className="pl-1 mt-3 grow flex flex-col">
        <h2 className="mb-3 text-xl font-extrabold tracking-tight text-gray-900">
          {blog.title}
        </h2>
        <p className="mb-3 text-gray-500 line-clamp-3">{blog.content}</p>
        <div className="mt-auto">
          <Link
            href="#"
            className="inline-flex items-center font-medium text-teal-600 hover:text-teal-800"
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
        </div>
      </div>
    </div>
  );
}
