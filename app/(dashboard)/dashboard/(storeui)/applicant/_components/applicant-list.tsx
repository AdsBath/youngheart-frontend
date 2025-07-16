"use client";

import Loading from "@/components/loding";
import { DataTable } from "@/components/table/data-table";
import { useApplicationsQuery } from "@/redux/api/applicationApi";
import { applicantColumns } from "./applicant-columns";

const ApplicantList = () => {
  const { data: application, isLoading: isBannerLoading } =
    useApplicationsQuery({});

  const applicationData = application?.data?.data;
  return (
    <>
      <div className="mb-2 md:flex items-center justify-between space-y-2 ">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Application List
          </h2>
          <p className="text-muted-foreground">List of Application</p>
        </div>
      </div>
      {isBannerLoading ? (
        <Loading />
      ) : (
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
          <DataTable
            data={applicationData || []}
            columns={applicantColumns}
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
export default ApplicantList;
