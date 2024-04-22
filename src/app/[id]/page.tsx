import api from "@/services";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import React from "react";
import BlogDetailClient from "./BlogDetailClient";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const id = params.id;

  try {
    const blog = await api.blog.findOne(id)();
    return {
      title: blog.title,
      description: blog.content,
    };
  } catch (error) {
    return {
      title: "Blog not found",
    };
  }
}

export default async function BlogDetail({
  params,
}: {
  params: { id: string };
}) {
  const queryClient = new QueryClient();
  try {
    await queryClient.fetchQuery({
      queryKey: ["blog", params.id],
      queryFn: api.blog.findOne(params.id),
    });
  } catch (error) {}

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BlogDetailClient id={params.id} />
    </HydrationBoundary>
  );
}
