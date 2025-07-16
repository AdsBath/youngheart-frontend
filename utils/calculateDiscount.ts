export const calculateDiscount = (price: number, discount: number) => {
  const discountAmount = price - (price * discount) / 100;
  return Math.floor(discountAmount);
};
