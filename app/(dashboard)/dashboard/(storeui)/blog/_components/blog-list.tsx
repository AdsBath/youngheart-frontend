"use client";

import Loading from "@/components/loding";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { IconStackPush } from "@tabler/icons-react";
import { blogColumns } from "./blog-columns";
import { useBlogsQuery } from "@/redux/api/blogApi";
import { onNewBlogOpen } from "@/redux/features/blog/blogSlice";

const BlogList = () => {
  const dispatch = useDispatch();
  const { data: blog, isLoading: isBlogLoading } = useBlogsQuery({});

  const blogData = blog?.data?.data;
  // console.log(blogData, "blogData");
  return (
    <>
      <div className="mb-2 md:flex items-center justify-between space-y-2 ">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Blog List</h2>
          <p className="text-muted-foreground">List of Blog</p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={() => dispatch(onNewBlogOpen())}
            size={"sm"}
            variant={"default"}
            className=""
          >
            <IconStackPush size={18} className="mr-2" />
            New Blog
          </Button>
        </div>
      </div>
      {isBlogLoading ? (
        <Loading />
      ) : (
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
          <DataTable
            data={blogData || []}
            columns={blogColumns}
            filterKey="title"
            filterPlaceholder="title"
            statuses={[]}
            priorities={[]}
          />
        </div>
      )}
    </>
  );
};
export default BlogList;
