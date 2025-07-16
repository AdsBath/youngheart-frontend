"use client";

import Loading from "@/components/loding";
import { Button } from "@/components/ui/button";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { useInventoriesQuery } from "@/redux/api/inventoryApi";
import { onNewInventoryOpen } from "@/redux/features/inventory/inventorySlice";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import InventoryNoteCard from "./inventory-note-card";
import InventoryTable from "./inventory-table";

const InventoryList = () => {
    const [loadedImg, setLoadedImg] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const limit = 5; // Show 5 inventory items per page

    const {
        data: inventories,
        isLoading: isInventoryLoading,
        isFetching,
    } = useInventoriesQuery({ page: currentPage, limit }); // Pass limit to query
    const dispatch = useDispatch();

    const inventoryDatas = inventories?.data?.data;

    console.log(inventories?.data, "total pages");

    // Update totalPages from the response data
    useEffect(() => {
        if (inventories?.data?.total) {
            const totalPage = Math.ceil(inventories.data.total / limit);
            setTotalPages(totalPage);
        }
    }, [inventories]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <>
            <div className="mb-2 md:flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">
                        Inventory List
                    </h2>
                    <p className="text-muted-foreground">
                        List of Inventories.
                    </p>
                </div>
            </div>
            {isInventoryLoading || isFetching ? (
                <div className="relative min-h-[70vh]">
                    <Loading />
                </div>
            ) : (
                <div className="flex-1 overflow-auto py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
                    <div className="flex flex-col gap-5 p-1">
                        {inventoryDatas?.length > 0 &&
                            inventoryDatas?.map(
                                (inventory: any, index: number) => (
                                    <div
                                        key={index}
                                        className="flex flex-col gap-1 border border-zinc-200 p-1"
                                    >
                                        <div className="grid grid-cols-12 gap-1">
                                            <div className="relative flex gap-2 col-span-5 border p-1">
                                                <div className="relative h-[180px] md:h-[200px] w-[200px] overflow-hidden rounded">
                                                    <Image
                                                        fill
                                                        className={cn(
                                                            "object-contain absolute inset-0 h-full w-full transition duration-200 rounded",
                                                            loadedImg
                                                                ? "blur-none"
                                                                : "blur-md"
                                                        )}
                                                        onLoad={() =>
                                                            setLoadedImg(true)
                                                        }
                                                        alt={
                                                            inventory?.product
                                                                ?.name
                                                        }
                                                        src={
                                                            inventory?.product
                                                                .thumbnail ||
                                                            "https://via.placeholder.com/560"
                                                        }
                                                    />
                                                </div>
                                                <div className="mx-2 w-[80%]">
                                                    <h2 className="text-lg font-bold mt-3">
                                                        {
                                                            inventory?.product
                                                                ?.name
                                                        }
                                                    </h2>
                                                    <p className="text-[#7d7d7d] text-sm">
                                                        {inventory?.product
                                                            ?.shortDescription
                                                            ?.length > 100
                                                            ? inventory?.product?.shortDescription.slice(
                                                                  0,
                                                                  100
                                                              ) + "..."
                                                            : inventory?.product
                                                                  ?.shortDescription}
                                                    </p>
                                                    <p>
                                                        <strong>
                                                            Current Stock:{" "}
                                                        </strong>
                                                        <span>
                                                            (
                                                            {
                                                                inventory?.currentQuantity
                                                            }
                                                            )
                                                        </span>
                                                    </p>
                                                </div>
                                                <div className="absolute bottom-2 right-2">
                                                    <Button
                                                        onClick={() =>
                                                            dispatch(
                                                                onNewInventoryOpen(
                                                                    inventory?.id
                                                                )
                                                            )
                                                        }
                                                    >
                                                        Add Note
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className="col-span-7 border p-1">
                                                <InventoryTable
                                                    key={index}
                                                    inventoryData={
                                                        inventory?.product
                                                            ?.variations
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                            {inventory?.inventoryNotes?.map(
                                                (
                                                    inventoryNoteItem: any,
                                                    index: number
                                                ) => (
                                                    <InventoryNoteCard
                                                        key={index}
                                                        inventoryNoteData={
                                                            inventoryNoteItem
                                                        }
                                                    />
                                                )
                                            )}
                                        </div>
                                    </div>
                                )
                            )}
                    </div>
                </div>
            )}
            <div className="mt-4">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={() =>
                                    handlePageChange(
                                        Math.max(currentPage - 1, 1)
                                    )
                                }
                                // disabled={currentPage === 1}
                            />
                        </PaginationItem>
                        {[...Array(totalPages)]?.map((_, index) => (
                            <PaginationItem key={index}>
                                <PaginationLink
                                    href="#"
                                    // className={`${index + 1 === currentPage && "text-red-500"}`}
                                    isActive={index + 1 === currentPage}
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={() =>
                                    handlePageChange(
                                        Math.min(currentPage + 1, totalPages)
                                    )
                                }
                                // disabled={currentPage === totalPages}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </>
    );
};
export default InventoryList;
