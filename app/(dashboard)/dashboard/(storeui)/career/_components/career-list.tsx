"use client";

import Loading from "@/components/loding";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { IconStackPush } from "@tabler/icons-react";
import { onNewPageLinkOpen } from "@/redux/features/pageLink/pageLinkSlice";
import { usePageLinksQuery } from "@/redux/api/pageLinkApi";
import { careerColumns } from "./career-columns";
import { useCareersQuery } from "@/redux/api/careerApi";
import { onNewCareerOpen } from "@/redux/features/career/careerSlice";

const CareerList = () => {
  const dispatch = useDispatch();
  const { data: career, isLoading: isBannerLoading } = useCareersQuery({});

  const careerData = career?.data?.data;
  return (
    <>
      <div className="mb-2 md:flex items-center justify-between space-y-2 ">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Career List</h2>
          <p className="text-muted-foreground">List of Career</p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={() => dispatch(onNewCareerOpen())}
            size={"sm"}
            variant={"default"}
            className=""
          >
            <IconStackPush size={18} className="mr-2" />
            New Career
          </Button>
        </div>
      </div>
      {isBannerLoading ? (
        <Loading />
      ) : (
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
          <DataTable
            data={careerData || []}
            columns={careerColumns}
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
export default CareerList;
