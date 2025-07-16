"use client";

import Loading from "@/components/loding";
import { DataTable } from "@/components/table/data-table";
import { useUsersQuery } from "@/redux/api/userApi";
import { customersColumns } from "./customers-columns";

const CustomerList = () => {
  const { data, isLoading } = useUsersQuery({});

  const regUser = data?.data?.data.filter((user: any) => user.role === "USER");

  // console.log(regUser, "regUser");

  return (
    <>
      <div className="mb-2 md:flex items-center justify-between space-y-2 ">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Registered Customers
          </h2>
          <p className="text-muted-foreground">
            List of all registered customers.
          </p>
        </div>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
          <DataTable
            data={regUser}
            columns={customersColumns}
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

export default CustomerList;
