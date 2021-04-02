import React, { useEffect, useContext } from "react";
import AuthContext from "../context/auth/authContext";
import { useShoppingCart } from "use-shopping-cart";
import ButtonCustom from "../components/ButtonCustom";
import { useHistory } from "react-router-dom";
import * as ROUTES from "../constants/routes";

const UnSuccessful = () => {
  const authContext = useContext(AuthContext);
  const { clearCart } = useShoppingCart();
  const history = useHistory();

  const handleGoingback = () => {
    clearCart();
    localStorage.setItem("date", "");
    localStorage.setItem("book", "");
    localStorage.setItem("time", "");
    history.push(ROUTES.BOOKING);
  };

  useEffect(() => {
    authContext.loadUser();
    clearCart();
    localStorage.setItem("date", "");
    localStorage.setItem("book", "");
    localStorage.setItem("time", "");
  });
  return (
    <section className="text-dark body-font mb-5 pb-4">
      <div className="container px-5 py-5 mx-auto m-5">
        <div className="text-center mt-3">
          <h1 className="text-sm-3xl text-2xl font-style-medium text-center title-font mb-3 mt-5">
            Payment Cancelled!
          </h1>
          <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 text-xl mx-auto">
            Sorry! There was an error completing the payment.
          </p>
          <br />
          <h3 className="text-xl text-info tracking-widest font-medium title-font mb-1">
            Please Try Again
          </h3>
          <div className="mt-5">
            <ButtonCustom
              buttonContent="Make another Booking"
              block={false}
              parentfunction={handleGoingback}
              size="md"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default UnSuccessful;
