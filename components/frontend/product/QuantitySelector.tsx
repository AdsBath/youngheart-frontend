import { Button } from "@/components/ui/button";
import { IconMinus, IconPlus } from "@tabler/icons-react";

export const QuantitySelector = ({
  quantity,
  setQuantity,
}: {
  quantity: number;
  setQuantity: (q: number) => void;
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setQuantity(Math.max(1, Number(value) || 1));
  };

  const handleBlur = () => {
    if (!quantity || quantity < 1) setQuantity(1);
  };

  return (
    <div className="flex items-center gap-0.5 bg-gray-100 rounded px-1 py-0.5 border border-gray-200 w-fit">
      <Button
        onClick={() => setQuantity(Math.max(1, quantity - 1))}
        size="icon"
        variant="ghost"
        className="text-[#f97316] rounded-full p-0.5 h-6 w-6"
        aria-label="Decrease quantity"
        tabIndex={0}
      >
        <IconMinus size={12} />
      </Button>
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={quantity}
        onChange={handleInputChange}
        onBlur={handleBlur}
        className="w-7 text-center text-sm font-medium text-[#f97316] bg-transparent outline-none border-none"
        aria-label="Quantity"
      />
      <Button
        onClick={() => setQuantity(quantity + 1)}
        size="icon"
        variant="ghost"
        className="text-[#f97316] rounded-full p-0.5 h-6 w-6"
        aria-label="Increase quantity"
        tabIndex={0}
      >
        <IconPlus size={12} />
      </Button>
    </div>
  );
};
