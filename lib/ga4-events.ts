/**
 * GA4 Ecommerce Events Utility
 * Helper functions to push GA4 ecommerce events to dataLayer
 */

declare global {
  interface Window {
    dataLayer: Array<Record<string, unknown>>;
  }
}

/**
 * Initialize dataLayer if it doesn't exist
 */
const initDataLayer = () => {
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];
  }
};

/**
 * Push event to dataLayer
 */
export const pushToDataLayer = (eventData: Record<string, unknown>) => {
  if (typeof window === "undefined") return;
  initDataLayer();
  window.dataLayer.push(eventData);
};

/**
 * Format product item for GA4 events
 */
export const formatProductItem = (product: any, cartItem?: any) => {
  const price = cartItem?.price || parseFloat(product?.price?.replace(/,/g, "") || "0");
  const quantity = cartItem?.quantity || 1;
  const discount = cartItem?.discountAmmount || 0;
  
  return {
    item_id: product?.sku || product?.id?.toString() || "",
    item_name: product?.name || "",
    item_category: product?.category?.name || "",
    item_category2: product?.category?.parentCategory?.name || "",
    item_variant: cartItem?.color || cartItem?.size || "",
    price: price,
    quantity: quantity,
    discount: discount,
    item_brand: product?.brand?.name || "Young Heart",
  };
};

/**
 * Format cart items array for GA4 events
 */
export const formatCartItems = (cartItems: any[], productsData?: any[]) => {
  if (!cartItems || cartItems.length === 0) return [];

  return cartItems.map((cartItem: any, index: number) => {
    const product = productsData?.find(
      (p: any) => p.id === cartItem.productId
    ) || cartItem.product;

    return {
      ...formatProductItem(product, cartItem),
      index: index,
    };
  });
};

/**
 * Calculate total value from cart items
 */
export const calculateTotalValue = (cartItems: any[]) => {
  if (!cartItems || cartItems.length === 0) return 0;
  
  return cartItems.reduce((total: number, item: any) => {
    const price = parseFloat(item.price || 0);
    const quantity = item.quantity || 1;
    const discount = item.discountAmmount || 0;
    return total + (price * quantity) - discount;
  }, 0);
};

/**
 * View Item Event - When user views product details
 */
export const trackViewItem = (product: any) => {
  const price = parseFloat(product?.price?.replace(/,/g, "") || "0");
  const discountPrice = product?.discountPrice 
    ? (price * parseFloat(product.discountPrice)) / 100 
    : 0;
  const finalPrice = price - discountPrice;

  pushToDataLayer({
    event: "view_item",
    currency: "BDT",
    value: finalPrice,
    items: [
      formatProductItem(product, {
        price: finalPrice,
        quantity: 1,
        discountAmmount: discountPrice,
      }),
    ],
  });
};

/**
 * Add to Cart Event - When user adds item to cart
 */
export const trackAddToCart = (product: any, cartItem: any) => {
  const price = parseFloat(cartItem?.price || product?.price?.replace(/,/g, "") || "0");
  const discount = cartItem?.discountAmmount || 0;
  const quantity = cartItem?.quantity || 1;
  const value = (price * quantity) - discount;

  pushToDataLayer({
    event: "add_to_cart",
    currency: "BDT",
    value: value,
    items: [
      formatProductItem(product, cartItem),
    ],
  });
};

/**
 * Begin Checkout Event - When user starts checkout process
 */
export const trackBeginCheckout = (cartItems: any[], productsData?: any[], coupon?: string) => {
  const items = formatCartItems(cartItems, productsData);
  const value = calculateTotalValue(cartItems);

  pushToDataLayer({
    event: "begin_checkout",
    currency: "BDT",
    value: value,
    coupon: coupon || "",
    items: items,
  });
};

/**
 * Add Shipping Info Event - When user adds shipping information
 */
export const trackAddShippingInfo = (
  cartItems: any[],
  productsData?: any[],
  shippingTier?: string,
  coupon?: string
) => {
  const items = formatCartItems(cartItems, productsData);
  const value = calculateTotalValue(cartItems);

  pushToDataLayer({
    event: "add_shipping_info",
    currency: "BDT",
    value: value,
    coupon: coupon || "",
    shipping_tier: shippingTier || "",
    items: items,
  });
};

/**
 * Add Payment Info Event - When user adds payment information
 */
export const trackAddPaymentInfo = (
  cartItems: any[],
  productsData?: any[],
  paymentType?: string,
  coupon?: string
) => {
  const items = formatCartItems(cartItems, productsData);
  const value = calculateTotalValue(cartItems);

  pushToDataLayer({
    event: "add_payment_info",
    currency: "BDT",
    value: value,
    coupon: coupon || "",
    payment_type: paymentType || "",
    items: items,
  });
};

/**
 * Purchase Event - When order is completed
 */
export const trackPurchase = (
  transactionId: string,
  cartItems: any[],
  productsData?: any[],
  orderData?: {
    value?: number;
    tax?: number;
    shipping?: number;
    coupon?: string;
  }
) => {
  const items = formatCartItems(cartItems, productsData);
  const value = orderData?.value || calculateTotalValue(cartItems);

  pushToDataLayer({
    event: "purchase",
    transaction_id: transactionId,
    value: value,
    tax: orderData?.tax || 0,
    shipping: orderData?.shipping || 0,
    currency: "BDT",
    coupon: orderData?.coupon || "",
    items: items,
  });
};

/**
 * View Cart Event - When user views cart
 */
export const trackViewCart = (cartItems: any[], productsData?: any[]) => {
  const items = formatCartItems(cartItems, productsData);
  const value = calculateTotalValue(cartItems);

  pushToDataLayer({
    event: "view_cart",
    currency: "BDT",
    value: value,
    items: items,
  });
};

/**
 * Remove from Cart Event - When user removes item from cart
 */
export const trackRemoveFromCart = (product: any, cartItem: any) => {
  const price = parseFloat(cartItem?.price || product?.price?.replace(/,/g, "") || "0");
  const discount = cartItem?.discountAmmount || 0;
  const quantity = cartItem?.quantity || 1;
  const value = (price * quantity) - discount;

  pushToDataLayer({
    event: "remove_from_cart",
    currency: "BDT",
    value: value,
    items: [
      formatProductItem(product, cartItem),
    ],
  });
};

