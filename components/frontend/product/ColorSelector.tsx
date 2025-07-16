import { Button } from "@/components/ui/button";

export const ColorSelector = ({ colors, selectedColor, setColor }: any) => (
  <div>
    <span className="text-sm font-semibold mb-2">Color:</span>
    <div className="flex gap-2 my-1 flex-wrap">
      {colors?.map((colorItem: string, index: number) => (
        <Button
          key={index}
          size="sm"
          onClick={() => setColor(colorItem)}
          variant={colorItem === selectedColor ? "select" : "selectOutline"}
          className="h-6 text-[12px]"
        >
          {colorItem}
        </Button>
      ))}
    </div>
  </div>
);
