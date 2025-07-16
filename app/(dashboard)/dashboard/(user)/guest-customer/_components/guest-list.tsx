"use client";

import Loading from "@/components/loding";
import { DataTable } from "@/components/table/data-table";
import { useUsersQuery } from "@/redux/api/userApi";
import { guestCustomerColumns } from "./guest-columns";

const GuestCustomerList = () => {
  const { data, isLoading } = useUsersQuery({});

  const guestCustomerData = data?.data?.data.filter(
    (user: any) => user.role === "GUEST"
  );
  return (
    <>
      <div className="mb-2 md:flex items-center justify-between space-y-2 ">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Guest Customer</h2>
          <p className="text-muted-foreground">List of all guest customers.</p>
        </div>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
          <DataTable
            data={guestCustomerData}
            columns={guestCustomerColumns}
            filterKey="title"
            filterPlaceholder="title "
            statuses={[]}
            priorities={[]}
          />
        </div>
      )}
    </>
  );
};
export default GuestCustomerList;
