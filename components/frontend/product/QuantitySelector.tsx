import { Button } from "@/components/ui/button";

export const QuantitySelector = ({ quantity, setQuantity }: any) => (
  <div className="flex items-center gap-2">
    <Button onClick={() => setQuantity(Math.max(1, quantity - 1))} size="sm" variant="outline">
      -
    </Button>
    <span>{quantity}</span>
    <Button onClick={() => setQuantity(quantity + 1)} size="sm" variant="outline">
      +
    </Button>
  </div>
);
