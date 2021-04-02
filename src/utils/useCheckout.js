import { useShoppingCart } from "use-shopping-cart";
import axios from "axios";
import toast from "react-hot-toast";

export default function useCheckout() {
  const { redirectToCheckout, cartDetails } = useShoppingCart();

  async function handleCheckout() {
    const session = await axios
      .post("/checkout-sessions", cartDetails)
      .then((res) => res.data)
      .catch((err) => {
        toast.error("Checkout Failed. Please try again.");
        console.log("checkout error", err);
      });

    if (session) {
      console.log(session.id);
      redirectToCheckout({ sessionId: session.id });
    }
  }

  return handleCheckout;
}
