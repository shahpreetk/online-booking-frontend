//@ts-check
import React, { useEffect } from "react";
import { useShoppingCart } from "use-shopping-cart";
import { Button } from "react-bootstrap";
import toast from "react-hot-toast";

export default function AddToCart({ addon }) {
  const { addItem } = useShoppingCart();

  const handleAddToCart = () => {
    addItem(addon);
    addon.inCart = true;
    toast.success(`${addon.title} Addon added to cart`);
  };

  useEffect(() => {
    localStorage.setItem("cart-values", "");
    addon.inCart = false;
    // eslint-disable-next-line
  }, []);

  return (
    <Button
      disabled={addon.inCart}
      className="addcart flex ml-auto text-white border-0 py-2 px-6 rounded"
      onClick={handleAddToCart}
      variant="info"
    >
      {addon.inCart === true ? <span>In Cart</span> : <span>Add to Cart</span>}
    </Button>
  );
}
