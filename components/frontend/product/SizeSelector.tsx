import { Button } from "@/components/ui/button";

export const SizeSelector = ({ sizes, selectedSize, setSize }: any) => (
  <div>
    {selectedSize.toLowerCase() !== "default" && (
      <>
        <span className="text-sm font-semibold mb-2">Size:</span>
        <div className="flex gap-3">
          {sizes?.map((sizeItem: any, index: number) => (
            <Button
              key={index}
              size="sm"
              onClick={() => setSize(sizeItem)}
              disabled={sizeItem?.quantity === "0"}
              variant={sizeItem === selectedSize ? "select" : "selectOutline"}
              className="h-6 text-[12px]"
            >
              {sizeItem}
            </Button>
          ))}
        </div>
      </>
    )}
  </div>
);
