"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { onEditVariantOpen } from "@/redux/features/variant/variantSlice";
import React from "react";
import { useDispatch } from "react-redux";

interface ColumnTitelProps {
  title: string;
  id: string;
}

const ColumnTitle: React.FC<ColumnTitelProps> = ({ title, id }) => {
  const dispatch = useDispatch();
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
            className="hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B] px-2 py-1 rounded-md cursor-pointer"
            onClick={() => dispatch(onEditVariantOpen(id))}
          >
            {title}
          </TooltipTrigger>
          <TooltipContent>
            <p>Edit {title}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};

export default ColumnTitle;
