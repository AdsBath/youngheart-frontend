"use client";

import { useConfirm } from "@/hooks/use-confirm";

import Loading from "@/components/loding";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";

import { useFetchAllAdminQuery } from "@/redux/api/userApi";
import { onAdminOpen } from "@/redux/features/admin/adminSlice";
import { IconUserPlus } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { adminColumns, roles, statuses } from "./admin-columns";

const AdminList = () => {
  const dispatch = useDispatch();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure ?",
    "Do you want to delete this category ?"
  );

  const { data, isLoading } = useFetchAllAdminQuery({});

  // console.log(data?.data, "admin")

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <ConfirmDialog />
          <div className="mb-2 md:flex items-center justify-between space-y-2 ">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Admin</h2>
              <p className="text-muted-foreground">
                List of all Admins in the system.
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => dispatch(onAdminOpen())}
                size={"sm"}
                variant={"default"}
                className=""
              >
                <IconUserPlus size={18} className="mr-2" />
                Create Admin
              </Button>
            </div>
          </div>
          <div className="flex-1 py-1 lg:flex-row lg:space-x-12 lg:space-y-0 overflow-x-auto w-full">
            <DataTable
              data={data?.data || []}
              columns={adminColumns}
              filterKey="firstName"
              filterPlaceholder="Name "
              statuses={statuses}
              priorities={roles}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AdminList;
