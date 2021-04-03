// @ts-check
import { formatCurrencyString } from "use-shopping-cart";

export default function formatPrice(addon) {
  return formatCurrencyString({
    value: addon.price,
    currency: "INR",
    language: navigator.language,
  });
}

export const formatValue = (addon) => {
  return formatCurrencyString({
    value: addon.value,
    currency: "INR",
    language: navigator.language,
  });
};
