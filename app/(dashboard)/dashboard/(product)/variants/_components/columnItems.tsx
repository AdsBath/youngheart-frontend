"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    onEditVariantItemOpen,
    onNewVariantItemOpen,
} from "@/redux/features/variant/variantSlice";
import { IconTextPlus } from "@tabler/icons-react";
import React from "react";
import { useDispatch } from "react-redux";

interface ColumnTitelProps {
    items: any;
    id: string;
}

const ColumnItems: React.FC<ColumnTitelProps> = ({ items, id }) => {
    const dispatch = useDispatch();
    return (
        <div className="flex w-full items-center justify-between">
            <div>
                {items?.map((item: any) => (
                    <TooltipProvider key={item.id}>
                        <Tooltip>
                            <TooltipTrigger
                                className="hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B] px-2 py-1 rounded-md cursor-pointer"
                                onClick={() =>
                                    dispatch(onEditVariantItemOpen(item.id))
                                }
                            >
                                <Badge
                                    variant={"secondary"}
                                    className="ml-2 text-sm"
                                >
                                    <span
                                        style={{
                                            backgroundColor: item.value,
                                        }}
                                        className={`w-2 h-2 rounded-full mr-1`}
                                    ></span>
                                    {item.name}
                                </Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Edit {item.vlaue}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                ))}
            </div>

            <Button
                size="sm"
                variant="secondary"
                className="ml-4 text-sm hover:bg-[#1B2637] hover:text-white "
                onClick={() => dispatch(onNewVariantItemOpen(id))}
            >
                <IconTextPlus size={18} className="mr-2" />
                Add
            </Button>
        </div>
    );
};

export default ColumnItems;
