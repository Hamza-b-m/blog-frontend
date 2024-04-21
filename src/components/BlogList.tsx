"use client";
import NoBlogs from "@/assets/svg/NoBlogs.svg";
import BlogCard from "@/components/BlogCard";
import api from "@/services";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function BlogList() {
  const { data: blogs } = useQuery({
    queryKey: ["blog list"],
    queryFn: api.blog.findAll(),
  });

  if (!blogs) {
    return <NoBlogs />;
  }

  return blogs.map((blog) => <BlogCard key={blog.id} {...blog} />);
}
