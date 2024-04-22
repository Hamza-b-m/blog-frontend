import BlogList from "@/components/BlogList";
import api from "@/services";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import Link from "next/link";

export const dynamic = "force-dynamic"
export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["blog list"],
    queryFn: api.blog.findAll(),
  });

  return (
    <main>
      <div className="px-3 py-4 sticky top-0 bg-gray-100 border-b-2 text-end text-base font-medium border-gray-300 shadow-md z-[9]">
        <Link
          href="/create-blog"
          className="overflow-hidden focus:bg-teal-800 bg-teal-700 rounded-md px-4 py-1.5 text-white hover:bg-teal-800 transition-all duration-300"
        >
          Create blog
        </Link>
      </div>
      <div className="flex my-10 mx-3 gap-4 flex-wrap justify-center">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <BlogList />
        </HydrationBoundary>
      </div>
    </main>
  );
}
