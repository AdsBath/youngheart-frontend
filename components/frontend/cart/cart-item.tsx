import BlurImg from "@/components/custom/blur-img";
import { Badge } from "@/components/ui/badge";
import {
  useDecrementQuantityMutation,
  useDeleteCartItemMutation,
  useIncrementQuantityMutation,
} from "@/redux/api/cartApi";
import {
  decrementQuantity,
  incrementQuantity,
  removeItem,
} from "@/redux/features/cart/cartSlice";
import { useAppDispatch } from "@/redux/hooks";
import { calculateDiscount } from "@/utils/calculateDiscount";
import { IconMinus, IconPlus, IconTrash } from "@tabler/icons-react";

const CartItem = ({
  item,
  userId,
  cardPage = true,
}: {
  item: any;
  userId: string;
  cardPage?: boolean;
}) => {
  const dispatch = useAppDispatch();
  const [decrement, { isLoading: decrementLoading }] =
    useDecrementQuantityMutation();
  const [increment, { isLoading: incrementLoading }] =
    useIncrementQuantityMutation();
  const [deleteItem, { isLoading: deleteItemLoading }] =
    useDeleteCartItemMutation();

  const handleInCrement = (id: string) => {
    dispatch(incrementQuantity(id));

    increment({ userId: userId, productId: id });
  };
  const handleDecrement = (id: string) => {
    dispatch(decrementQuantity(id));
    decrement({ userId: userId, productId: id });
  };

  const handleDelete = (id: string) => {
    dispatch(removeItem(id));
    deleteItem(id);
  };

  return cardPage ? (
    // cart sheet design
    <div className="flex flex-col gap-2 py-2">
      <div className="flex items-start gap-2 py-1 justify-between border-b px-3">
        <div className="flex gap-2 items-start w-[70%]">
          <div>
            <IconTrash
              onClick={() => handleDelete(item?.id)}
              size={16}
              className="cursor-pointer text-red-500"
            />
            {/* {deleteItemLoading && (
              <p className="text-sm text-slate-950 dark:text-gray-400 ml-[2px]">
                <span className="animate-pulse">.</span>
                <span className="animate-ping">.</span>
                <span className="animate-ping">.</span>
              </p>
            )} */}
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xs leading-none">
              {item?.name}
              {"  "}
            </span>
            <span className="text-sm font-bold">
              ৳{" "}
              {Number(
                item?.discount
                  ? calculateDiscount(item?.price, item?.discount)
                  : item?.price
              )?.toFixed(2)}
            </span>
            <p className="flex gap-1 flex-wrap">
              <Badge variant="outline">
                <span>{item?.color}</span>
              </Badge>
              <Badge variant="outline">
                <span>{item?.size}</span>
              </Badge>
            </p>
            <div
              style={{ width: "75px" }}
              className="flex justify-between text-sm items-center p-1 border rounded-md"
            >
              <IconMinus
                onClick={() => handleDecrement(item?.productId)}
                size={13}
                className="cursor-pointer"
              />
              <div>
                <span> {item.quantity}</span>
              </div>
              <IconPlus
                onClick={() =>
                  // increment({ userId: userId, productId: item?.productId })
                  handleInCrement(item?.productId)
                }
                size={13}
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="w-[30%]">
          <BlurImg
            src={item?.image ?? "https://via.placeholder.com/150"}
            alt={item?.name}
            className="h-16 w-16 border rounded"
          />
        </div>
      </div>
    </div>
  ) : (
    // card page design
    <div className="flex gap-2 items-start md:items-center flex-1 justify-between flex-col md:flex-row">
      <div className="flex gap-4 items-center">
        <div>
          <IconTrash
            onClick={() => handleDelete(item?.id)}
            size={18}
            className="cursor-pointer text-red-500"
          />
        </div>

        <div>
          <BlurImg
            src={item?.image ?? "https://via.placeholder.com/150"}
            alt={item?.name || "img"}
            className="w-16 h-16 rounded"
          />
        </div>

        <div className="flex flex-col gap-1 ">
          <span className="text-sm">{item?.name}</span>
          <div className="flex gap-1">
            <Badge variant="outline">
              <span>{item?.color}</span>
            </Badge>
            <Badge variant="outline">
              <span>{item?.size}</span>
            </Badge>
          </div>
        </div>
      </div>
      <div
        style={{ width: "75px" }}
        className=" justify-between text-sm items-center p-1 border rounded-md hidden md:flex"
      >
        <IconMinus
          size={13}
          className="cursor-pointer"
          onClick={() => handleDecrement(item?.productId)}
        />
        <span>{item?.quantity}</span>
        <IconPlus
          size={13}
          className="cursor-pointer"
          onClick={() => handleInCrement(item?.productId)}
        />
      </div>
      <span className="text-sm font-bold hidden md:flex">
        ৳{" "}
        {(
          parseFloat(
            item.discount
              ? calculateDiscount(item?.price, item?.discount)
              : item?.price
          ) * item?.quantity
        ).toFixed(2)}
      </span>

      <div className="md:hidden flex gap-4 justify-center items-center pl-5">
        <div
          style={{ width: "75px" }}
          className="flex justify-between text-sm items-center p-1 border rounded-md"
        >
          <IconMinus
            size={13}
            className="cursor-pointer"
            onClick={() => handleDecrement(item?.productId)}
          />
          <span>{item?.quantity}</span>
          <IconPlus
            size={13}
            className="cursor-pointer"
            onClick={() => handleInCrement(item?.productId)}
          />
        </div>

        <p className="text-sm font-bold">৳ {Number(item?.price).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CartItem;
