import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import ButtonCustom from "../components/ButtonCustom";
import { useLocation } from "react-router-dom";
import { formatCurrencyString } from "use-shopping-cart";
import AuthContext from "../context/auth/authContext";
import * as ROUTES from "../constants/routes";
import { useShoppingCart } from "use-shopping-cart";
import formatPrice from "../utils/formatPrice";

function useQueryString() {
  return new URLSearchParams(useLocation().search);
}

export default function Result() {
  const queryString = useQueryString();
  const sessionId = queryString.get("session_id");
  const authContext = useContext(AuthContext);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const history = useHistory();
  const { clearCart, cartDetails, totalPrice } = useShoppingCart();
  const cartItems = Object.keys(cartDetails).map((key) => cartDetails[key]);

  async function sendBooking() {
    const book = localStorage.getItem("book");
    const date = localStorage.getItem("date");
    const time = localStorage.getItem("time");
    let addons = [];
    cartItems.map((item) => {
      if (item.id !== 1) {
        return addons.push(...addons, item);
      } else return null;
    });
    if (book === "audi") {
      const bAudi = {
        date,
        time,
        addons,
        cost: totalPrice,
      };

      return await axios
        .post("/baudis", bAudi)
        .then((res) => {
          return res.data;
        })
        .catch((err) => console.log(err));
    }
    if (book === "turf") {
      const bTurf = {
        date,
        time,
        addons,
        cost: totalPrice,
      };
      return await axios
        .post("/baudis", bTurf)
        .then((res) => res.data)
        .catch((err) => console.log(err));
    }
  }

  useEffect(() => {
    authContext.loadUser();
    sendBooking();
    if (sessionId) {
      axios
        .get(`/checkout-sessions/${sessionId}`)
        .then((res) => {
          setIsLoading(false);
          setData(res.data);
        })
        .catch((err) => {
          setIsError(true);
          console.log(err);
        });
    } else {
      console.log("No session found");
    }
    // eslint-disable-next-line
  }, []);

  const handleGoingback = () => {
    clearCart();
    localStorage.setItem("date", "");
    localStorage.setItem("book", "");
    localStorage.setItem("time", "");
    history.push(ROUTES.BOOKING);
  };

  if (isLoading)
    return (
      <section>
        <div
          className="container m-auto flex justify-content-center"
          style={{ height: "100vh" }}
        >
          <div
            className="m-auto flex max-w-screen-lg flex-col text-center"
            style={{ textAlign: "center" }}
          >
            <img
              width="128px"
              height="128px"
              style={{ marginTop: "20%" }}
              src="/assets/loader.gif"
              alt="loader"
            />
          </div>
        </div>
      </section>
    );
  if (!data && !isLoading)
    return (
      <div className="text-white font-bold text-center mx-auto">
        No purchase found.
      </div>
    );
  if (isError)
    return (
      <div className="text-red-500 font-bold text-center mx-auto">
        Error loading result page
      </div>
    );

  const total = formatCurrencyString({
    value: data.amount_total,
    currency: "INR",
    language: navigator.language,
  });

  return (
    <section
      className="text-light body-font"
      style={{ backgroundColor: "#1b1b56" }}
    >
      <div className="container px-5 py-5 mx-auto">
        <div className="text-center mt-3">
          <h1 className="text-sm-3xl text-2xl font-style-medium text-center title-font text-white mb-3 mt-5">
            Payment Accepted!
          </h1>
          <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 text-xl mx-auto">
            See you soon. Hope you have a great time at your event.
          </p>
          <br />
          <h3 className="text-xl text-info tracking-widest font-medium title-font mb-1">
            Order Total: {total}
          </h3>
          <h3 className="text-xl text-info tracking-widest font-medium title-font mb-2">
            Email: {data.customer_email}
            <br />
            <br />
            Cart Details :
          </h3>
          {cartItems.map((cartItem) => {
            const price = formatPrice(cartItem);
            return (
              <>
                <Row>
                  <Col>
                    <h6 className="text-light">
                      {cartItem.title} : {price}
                    </h6>
                  </Col>
                </Row>
              </>
            );
          })}
          <h5 className="text-md text-light mt-4">
            Thank you for booking with us!
          </h5>
          <div className="mt-5">
            <ButtonCustom
              buttonContent="Ok"
              block={false}
              parentfunction={handleGoingback}
              size="md"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
