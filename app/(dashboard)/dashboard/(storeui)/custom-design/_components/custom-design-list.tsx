"use client";

import Loading from "@/components/loding";
import { DataTable } from "@/components/table/data-table";
import { useCustomDesignsQuery } from "@/redux/api/customDesignApi";
import { customDesignColumns } from "./custom-design-columns";

const CustomDesignList = () => {
  const { data: customDesign, isLoading: isCustomDesignLoading } =
    useCustomDesignsQuery({});

  const customDesignData = customDesign?.data?.data;
  console.log({ customDesignData, isCustomDesignLoading });
  return (
    <>
      <div className="mb-2 md:flex items-center justify-between space-y-2 ">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Custom design list
          </h2>
          <p className="text-muted-foreground">List of Custom desing</p>
        </div>
      </div>
      {isCustomDesignLoading ? (
        <Loading />
      ) : (
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
          <DataTable
            data={customDesignData || []}
            columns={customDesignColumns}
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
export default CustomDesignList;
