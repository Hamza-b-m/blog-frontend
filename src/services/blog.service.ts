import { Blog } from "@/types/blog.type";
import axiosInstance from "./axiosInstance";

const create = (data: Omit<Blog, "id" | "upvote" | "downvote">) =>
  axiosInstance<Blog>({
    method: "post",
    url: "blog",
    data,
  }).then((res) => {
    return res.data;
  });

const findAll = (params?: { search?: string }) => () =>
  axiosInstance<Blog[]>({
    method: "get",
    url: "blog",
    params,
  }).then((res) => {
    return res.data;
  });

const findOne = (id: string) => () =>
  axiosInstance<Blog>({
    method: "get",
    url: "blog/" + id,
  }).then((res) => {
    return res.data;
  });

const update =
  ({
    id,
    data,
  }: {
    id: string;
    data: Omit<Blog, "id" | "upvote" | "downvote">;
  }) =>
  () =>
    axiosInstance({
      method: "patch",
      url: "blog/" + id,
      data,
    }).then((res) => {
      return res.data;
    });

const upvote = (id: string) => () =>
  axiosInstance({
    method: "post",
    url: "blog/" + id + "/upvote",
  }).then((res) => {
    return res.data;
  });

const downvote = (id: string) => () =>
  axiosInstance({
    method: "post",
    url: "blog/" + id + "/downvote",
  }).then((res) => {
    return res.data;
  });

const remove = (id: string) => () =>
  axiosInstance({
    method: "delete",
    url: "blog/" + id,
  }).then((res) => {
    return res.data;
  });

const blog = {
  create,
  findAll,
  findOne,
  update,
  remove,
  upvote,
  downvote,
};

export default blog;
