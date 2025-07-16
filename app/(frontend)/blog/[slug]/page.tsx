"use client";
import BlogDetails from "@/components/frontend/blog/blog-details";
import Loading from "@/components/loding";
import { useGetBlogBySlugQuery } from "@/redux/api/blogApi";

const BlogDetailsPage = ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  const { data, isLoading } = useGetBlogBySlugQuery(slug);
  console.log({ data });
  return (
    <div>
      {isLoading ? (
        <div className="h-screen">
          <Loading />
        </div>
      ) : (
        <BlogDetails blog={data?.data} />
      )}
    </div>
  );
};

export default BlogDetailsPage;
