import { Button } from "@/components/custom/button";
import { Input } from "@/components/ui/input";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { IconTrash } from "@tabler/icons-react";

import { useDispatch } from "react-redux";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableViewOptions } from "./data-table-view-options";

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
    priorities?: any[];
    statuses?: any[];
    filterKey: string;
    filterPlaceholder?: string;
    selectedField?: string[];
    handleDeleteMultiple?: (items: string[]) => void;
}

export function DataTableToolbar<TData>({
    table,
    priorities,
    statuses,
    filterKey,
    filterPlaceholder,
    selectedField,
    handleDeleteMultiple,
}: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters?.length > 0;
    const dispatch = useDispatch();
    const handleMultiple = async () => {
        handleDeleteMultiple!(selectedField || []);
    };

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
                <Input
                    placeholder={`Filter ${filterPlaceholder || ""}...`}
                    value={
                        (table
                            .getColumn(filterKey)
                            ?.getFilterValue() as string) ?? ""
                    }
                    onChange={(event) =>
                        table
                            .getColumn(filterKey)
                            ?.setFilterValue(event.target.value)
                    }
                    className="h-8 w-[150px] lg:w-[250px]"
                />
                <div className="flex gap-x-2">
                    {table.getColumn("status") && (
                        <DataTableFacetedFilter
                            column={table.getColumn("status")}
                            title="Status"
                            options={statuses || []}
                        />
                    )}
                    {table.getColumn("isAvailable") && (
                        <DataTableFacetedFilter
                            column={table.getColumn("isAvailable")}
                            title="Available"
                            options={priorities || []}
                        />
                    )}
                    {table.getColumn("paymentMethod") && (
                        <DataTableFacetedFilter
                            column={table.getColumn("paymentMethod")}
                            title="Payment Method"
                            options={priorities || []}
                        />
                    )}
                    {table.getColumn("role") && (
                        <DataTableFacetedFilter
                            column={table.getColumn("role")}
                            title="Filter by Role"
                            options={priorities || []}
                        />
                    )}
                </div>
                {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={() => table.resetColumnFilters()}
                        className="h-8 px-2 lg:px-3"
                    >
                        Reset
                        <Cross2Icon className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>
            {table.getFilteredSelectedRowModel().rows.length > 0 && (
                <Button
                    size={"sm"}
                    variant={"outline"}
                    className=" font-normal text-sx ml-auto mr-2"
                    onClick={handleMultiple}
                >
                    <IconTrash size={16} className="mr-2" />
                    Delete ({table.getFilteredSelectedRowModel().rows.length})
                </Button>
            )}
            <DataTableViewOptions table={table} />
        </div>
    );
}
