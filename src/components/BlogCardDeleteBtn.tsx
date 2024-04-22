"use client";
import Trash from "@/assets/svg/Trash.svg";
import api from "@/services";
import { Blog } from "@/types/blog.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";

export default function BlogCardDeleteBtn(blog: Blog) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { isPending, reset, mutate } = useMutation({
    mutationFn: api.blog.remove(blog.id),
    onSuccess: async () => {
      await queryClient.setQueryData<Blog[]>(["blog list"], (oldData) =>
        oldData?.filter((data) => data.id !== blog.id)
      );

      await queryClient.setQueryData<Blog>(["blog", blog.id], undefined);
      queryClient.invalidateQueries({
        queryKey: ["blog list"],
      });
      reset();
    },
    onError: () => {
      toast.error("Something went wrong, please try again");
      reset();
    },
  });
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickDelete = () => mutate();

  return (
    <div className="ml-auto">
      <button
        className="inline-block text-red-500 hover:bg-red-100 focus:ring-4 focus:outline-none focus:ring-red-200 rounded-full w-8 h-8 p-1.5 transition-all duration-300"
        type="button"
        onClick={handleClickOpen}
      >
        <Trash />
      </button>
      {open && (
        <div
          id="default-modal"
          tabIndex={-1}
          className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full"
        >
          <div className="relative p-4 w-full max-w-sm">
            <div className="relative bg-white shadow rounded-lg ">
              <div className="flex items-center justify-between p-3 md:p-3 border-b rounded-t">
                <h3 className="text-xl font-semibold text-red-700">
                  Delete {blog.title}
                </h3>
              </div>
              <div className="p-3 md:p-3 space-y-3">
                <p className="text-base leading-relaxed text-gray-500">
                  Are you sure you want to delete {blog.title}?<br />
                  <span className="font-medium text-black">
                    This action is irreversible.
                  </span>{" "}
                  {blog.title} will be permanently deleted.
                </p>
              </div>
              <div className="flex items-center p-3 md:p-3 border-t border-gray-200 rounded-b">
                <button
                  type="button"
                  className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  onClick={handleClickDelete}
                  disabled={isPending}
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
                  <span>Delete</span>
                </button>
                <button
                  type="button"
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100"
                  onClick={handleClose}
                  disabled={isPending}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
