"use client";
import InputField from "@/components/InputField";
import TextareaField from "@/components/TextareaField";
import api from "@/services";
import { Blog } from "@/types/blog.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

type CreateBlogType = Omit<Blog, "downvote" | "upvote" | "id">;

export default function CreateBlog() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const methods = useForm<CreateBlogType>({
    defaultValues: {
      title: "",
      author: "",
      content: "",
    },
  });

  const { isPending, reset, mutate } = useMutation({
    mutationFn: api.blog.create,
    onSuccess: async (data) => {
      await queryClient.setQueryData<Blog[]>(["blog list"], (oldData) => [
        ...(oldData ?? []),
        data,
      ]);
      queryClient.invalidateQueries({
        queryKey: ["blog list"],
      });

      toast.success("Blog successfully added");
      reset();
      router.back();
    },
    onError: () => {
      toast.error(
        "Something went wrong, please refresh the page and try again"
      );
      reset();
    },
  });

  const onSubmit: SubmitHandler<CreateBlogType> = (data) => {
    console.log({ data });
    mutate(data);
  };

  return (
    <FormProvider {...methods}>
      <div className="px-4">
        <h1 className="text-center text-xl font-bold mt-16 mb-10">
          Create a blog
        </h1>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="max-w-lg w-full mx-auto flex flex-col gap-3"
        >
          <InputField
            label="Title"
            name="title"
            rules={{ required: true }}
            disabled={isPending}
          />
          <InputField
            label="Author"
            name="author"
            rules={{ required: true }}
            disabled={isPending}
          />
          <TextareaField
            label="Content"
            name="content"
            rules={{ required: true }}
            disabled={isPending}
          />
          <div className="sm:flex sm:flex-row justify-end">
            <button
              onClick={() => router.push("/")}
              className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-100 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              type="button"
              disabled={isPending}
            >
              Go back
            </button>
            <button
              disabled={!methods.formState.isDirty || isPending}
              className={
                "mt-3 inline-flex w-full justify-center items-center rounded-md border border-transparent bg-green-600 hover:bg-green-700 focus:bg-green-700 px-4 py-2 text-base font-medium text-white shadow-sm sm:ml-3 sm:w-auto sm:text-sm focus:outline-none sm:mt-0 " +
                (methods.formState.isDirty ? "" : "cursor-not-allowed")
              }
              type="submit"
            >
              {isPending && (
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 me-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
              )}
              <span>Create</span>
            </button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
}
