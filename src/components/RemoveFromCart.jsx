//@ts-check
import React, { useEffect } from "react";
import { useShoppingCart } from "use-shopping-cart";
import { Button } from "react-bootstrap";
import toast from "react-hot-toast";

const RemoveFromCart = ({ addon }) => {
  const { removeItem } = useShoppingCart();

  const handleRemoveFromCart = () => {
    removeItem(addon.id);
    addon.inCart = false;
    toast.success(`${addon.title} Addon removed from cart`);
  };

  useEffect(() => {
    localStorage.setItem("cart-values", "");
    // eslint-disable-next-line
  }, []);

  return (
    <Button
      disabled={!addon.inCart}
      className="addcart flex ml-auto text-white border-0 py-2 px-2 rounded m-1"
      onClick={handleRemoveFromCart}
      variant="info"
    >
      <span>Remove From Cart</span>
    </Button>
  );
};

export default RemoveFromCart;
