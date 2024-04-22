"use client";
import ThumbDown from "@/assets/svg/ThumbDown.svg";
import ThumbUp from "@/assets/svg/ThumbUp.svg";
import api from "@/services";
import { Blog } from "@/types/blog.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { toast } from "react-toastify";

type VoteContainerProps = { id: string; upvote: number; downvote: number };

export default function VoteContainer({
  id,
  upvote,
  downvote,
}: VoteContainerProps) {
  const queryClient = useQueryClient();
  const {
    isPending: isPendingUpvote,
    reset: resetUpvote,
    mutate: mutateUpvote,
  } = useMutation({
    mutationFn: api.blog.upvote(id),
    onSuccess: async (data) => {
      await queryClient.setQueryData<Blog[]>(["blog list"], (oldData) =>
        oldData?.map((blog) => {
          if (blog.id === id) {
            return data;
          }
          return blog;
        })
      );

      await queryClient.setQueryData<Blog>(["blog", id], data);
      queryClient.invalidateQueries({
        queryKey: ["blog list"],
      });
      resetUpvote();
    },
    onError: () => {
      toast.error("Something went wrong, please try again");
      resetUpvote();
    },
  });

  const {
    isPending: isPendingDownvote,
    reset: resetDownvote,
    mutate: mutateDownvote,
  } = useMutation({
    mutationFn: api.blog.downvote(id),
    onSuccess: async (data) => {
      await queryClient.setQueryData<Blog[]>(["blog list"], (oldData) =>
        oldData?.map((blog) => {
          if (blog.id === id) {
            return data;
          }
          return blog;
        })
      );

      await queryClient.setQueryData<Blog>(["blog", id], data);
      queryClient.invalidateQueries({
        queryKey: ["blog list"],
      });
      resetDownvote();
    },
    onError: () => {
      toast.error("Something went wrong, please try again");
      resetDownvote();
    },
  });

  const handleClickUpvote = () => {
    if (isPendingUpvote) {
      return;
    }
    mutateUpvote();
  };
  const handleClickDownvote = () => {
    if (isPendingDownvote) {
      return;
    }
    mutateDownvote();
  };

  return (
    <div className="flex items-center gap-1.5 ml-auto">
      <span
        className="cursor-pointer text-green-500"
        onClick={handleClickUpvote}
      >
        <ThumbUp />
      </span>
      <span>{upvote}</span>
      <div className="h-4 border-r-2 border-gray-300" />
      <span>{downvote}</span>
      <span
        className="cursor-pointer text-red-500"
        onClick={handleClickDownvote}
      >
        <ThumbDown />
      </span>
    </div>
  );
}
