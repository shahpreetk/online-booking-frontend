//@ts-check
import React, { useState, useEffect } from "react";
import { useShoppingCart } from "use-shopping-cart";
import { Button } from "react-bootstrap";
import toast from "react-hot-toast";

export default function AddToCart({ addon }) {
  const [somaiya, setSomaiya] = useState(false);
  const { addItem } = useShoppingCart();

  const handleAddToCart = () => {
    if (somaiya) {
      addItem({
        id: addon.id,
        sku: addon.id,
        title: addon.title,
        currency: "INR",
        name: addon.title,
        description: addon.description,
        price: 100,
        inCart: true,
      });
    } else {
      addItem(addon);
    }
    addon.inCart = true;
    toast.success(`${addon.title} Addon added to cart`);
  };

  const checkEmail = () => {
    const email = localStorage.getItem("email");
    const isSomaiya = email.split("@")[1];
    if (isSomaiya === "somaiya.edu") {
      setSomaiya(true);
    } else setSomaiya(false);
  };

  useEffect(() => {
    checkEmail();
    addon.inCart = false;
    // eslint-disable-next-line
  }, []);

  return (
    <Button
      disabled={addon.inCart}
      className="flex ml-auto border-0 py-2 px-2 rounded m-1"
      onClick={handleAddToCart}
      variant="warning"
    >
      {addon.inCart === true ? <span>In Cart</span> : <span>Add to Cart</span>}
    </Button>
  );
}
