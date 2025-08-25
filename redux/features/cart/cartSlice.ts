import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ICartSheetStore {
  isOpen: boolean;
  items: CartItem[];
}
interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  discountAmmount: number;
  discount: number;
  size: string;
  color: string;
}
const initialState: ICartSheetStore = {
  isOpen: false,
  items: [],
};

const cartSlice = createSlice({
  name: "CartSlice",
  initialState,
  reducers: {
    onCartOpen: (state) => {
      state.isOpen = true;
    },
    onCloseCart: (state) => {
      state.isOpen = false;
    },
    addItemToCart(state, action: PayloadAction<CartItem>) {
      if (!state.items) {
        state.items = [];
      }
      const existingItem = state.items?.find(
        (item) => item?.productId === action.payload.productId
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    setCartItems(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload; // Sync with API response
    },

    incrementQuantity(state, action: PayloadAction<string>) {
      const item = state.items?.find(
        (item) => item.productId === action.payload
      );

      if (item) {
        state.items = state.items?.map((item) => {
          return {
            ...item,
            quantity:
              item.productId === action.payload
                ? item.quantity + 1
                : item.quantity,
          };
        });
      }
    },
    decrementQuantity(state, action: PayloadAction<string>) {
      const item = state.items?.find(
        (item) => item.productId === action.payload
      );
      if (item?.quantity! > 1) {
        state.items = state.items?.map((item) => {
          return {
            ...item,
            quantity:
              item.productId === action.payload
                ? item.quantity - 1
                : item.quantity,
          };
        });
      } else {
        state.items = state.items?.filter(
          (item) => item.productId !== action.payload
        );
      }
    },

    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items?.filter((item) => item.id !== action.payload);
    },
  },
});

export const {
  onCartOpen,
  onCloseCart,
  setCartItems,
  addItemToCart,
  incrementQuantity,
  decrementQuantity,
  removeItem,
} = cartSlice.actions;

export default cartSlice.reducer;
