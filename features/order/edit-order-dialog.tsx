import OrderView from "@/app/(dashboard)/dashboard/(other)/order/_components/order-view";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
// import { useOrderQuery } from "@/redux/api/orderApi";
import { onCloseEditOrder } from "@/redux/features/order/orderSlice";
import { RootState } from "@/redux/store";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

const EditOrderDialog = () => {
  const { isOpen, data } = useSelector(
    (state: RootState) => state.order.editOrderSheet
  );

  // const { data, isLoading } = useOrderQuery(id);
  const dispatch = useDispatch();

  // console.log(isOpen, id, "edit inventory dialog");
  // console.log(data, "view order data");
  return (
    <div>
      <Dialog open={isOpen}>
        <DialogContent style={{ maxWidth: "800px" }}>
          <DialogHeader>
            <DialogTitle>
              Order Invoice
              <Button
                size="icon"
                variant="link"
                onClick={() => dispatch(onCloseEditOrder())}
                className="absolute top-2 right-2"
              >
                <X size={14} />
              </Button>
            </DialogTitle>
            <DialogDescription>youngheartbd</DialogDescription>
          </DialogHeader>
          <div>
            <OrderView orderData={data} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditOrderDialog;
