// utils/formatNumber.js
export const thousandSeparator = (number: number) => {
  return new Intl.NumberFormat("en-US").format(number);
};
