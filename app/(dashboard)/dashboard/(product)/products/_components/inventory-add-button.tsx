"use client";
import { Button } from "@/components/ui/button";
import { onNewInventoryOpen } from "@/redux/features/inventory/inventorySlice";
import { IconTextPlus } from "@tabler/icons-react";
import React from "react";
import { useDispatch } from "react-redux";

interface InventoryProps {
  id: string;
}

const InventoryAddButton: React.FC<InventoryProps> = ({ id }) => {
  const dispatch = useDispatch();
  return (
    <div className="">
      <Button
        size="sm"
        variant="secondary"
        className="ml-4 text-sm hover:bg-[#1B2637] hover:text-white "
        onClick={() => dispatch(onNewInventoryOpen(id))}
      >
        <IconTextPlus size={18} className="mr-2" />
        Add
      </Button>
    </div>
  );
};

export default InventoryAddButton;
