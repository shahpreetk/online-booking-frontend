// @ts-check
import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Container, Col, Row, Card, Button } from "react-bootstrap";
// import ButtonCustom from "../components/ButtonCustom";
import { useShoppingCart } from "use-shopping-cart";
import formatPrice from "../utils/formatPrice";
import AuthContext from "../context/auth/authContext";
import styled from "styled-components";
import RemoveFromCart from "../components/RemoveFromCart";
import { AiOutlineClose } from "react-icons/ai";
import * as ROUTES from "../constants/routes";
// import useCheckout from "../utils/useCheckout";
import axios from "axios";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const Styled = styled.div`
  .background-photo {
    background: black;
    overflow: hidden;
    background: -webkit-linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
      url("https://image.freepik.com/free-vector/young-people-standing-near-cashier-grocery-store-counter-payment-buyer-flat-vector-illustration-food-meal-products_74855-8742.jpg");
    object-fit: contain;
    background-size: contain;
  }
`;

const Checkout = () => {
  const {
    cartCount,
    formattedTotalPrice,
    cartDetails,
    totalPrice,
    clearCart,
  } = useShoppingCart();
  const authContext = useContext(AuthContext);
  const cartItems = Object.keys(cartDetails).map((key) => cartDetails[key]);
  const history = useHistory();
  // const handleCheckout = useCheckout();
  const stripe = useStripe();
  const elements = useElements();

  const clearFullCart = () => {
    clearCart();
    localStorage.setItem("date", "");
    localStorage.setItem("book", "");
    localStorage.setItem("time", "");
    history.push(ROUTES.BOOKING);
  };

  const fetchCheckoutSession = async ({ quantity, amount }) => {
    // return fetch("/create-checkout-session", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     quantity,
    //   }),
    // }).then((res) => res.json());
    const book = {
      quantity,
      amount,
    };

    return axios.post("/checkout-sessions", book).then((res) => res.data);
  };

  const handleClick = async (event) => {
    // Call your backend to create the Checkout session.
    // dispatch({ type: "setLoading", payload: { loading: true } });
    const { sessionId } = await fetchCheckoutSession({
      quantity: 1,
      amount: totalPrice,
    });
    // When the customer clicks on the button, redirect them to Checkout.
    const { error } = await stripe.redirectToCheckout({
      sessionId,
    });
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    if (error) {
      console.log("error", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      console.log("Stripe 23 | token generated!", paymentMethod);
      try {
        const { id } = paymentMethod;
        const response = await axios.post("/checkout-sessions", {
          amount: 1500000,
          id: id,
        });

        console.log("Stripe 35 | data", response.data.success);
        if (response.data.success) {
          console.log("CheckoutForm.js 25 | payment successful!");
        }
      } catch (error) {
        console.log("CheckoutForm.js 28 | ", error);
      }
    } else {
      console.log(error.message);
    }
  };

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <Styled>
      <div className="background-photo">
        <Container className="p-5">
          <Card
            className="m-5 p-3 border-0 shadow-lg"
            style={{ backgroundColor: "#f1f5f9" }}
          >
            <Row className="m-3">
              <Col md={9}>
                <h3 className="text-center">Cart Summary</h3>
              </Col>
              <Col md={3}>
                <div className="text-right">
                  <p aria-label="Clear Cart" title="Clear Cart">
                    Clear Cart <AiOutlineClose onClick={clearFullCart} />
                  </p>
                </div>
              </Col>
            </Row>
            <Row className="ml-3">
              <Col className="ml-5">
                <p>{cartCount} Cart Items : </p>
              </Col>
            </Row>
            <Row className="mx-3 my-0">
              {cartItems.map((cartItem) => {
                const price = formatPrice(cartItem);
                return (
                  <Col key={cartItem.id} md={12} className="my-3">
                    <Row>
                      <Col className="text-left" md={6}>
                        <h6>{cartItem.title}</h6>
                        <RemoveFromCart addon={cartItem} />
                      </Col>
                      <Col className="text-right" md={6}>
                        <span className="text-muted text-right">{price}</span>
                      </Col>
                    </Row>
                  </Col>
                );
              })}
              <Col className="text-left mt-3" md={6}>
                <h6>Total Price :</h6>
              </Col>
              <Col className="text-right mt-3" md={6}>
                <span className="text-muted text-right">
                  {formattedTotalPrice}
                </span>
              </Col>
            </Row>
            <Row className="m-3">
              <Col className="text-right mt-3 ml-5">
                <Button
                  style={{
                    backgroundColor: "#6772E5",
                    color: "#FFF",
                    padding: "8px 12px",
                    border: 0,
                    borderRadius: "4px",
                    fontSize: "1em",
                  }}
                  // @ts-ignore
                  onClick={handleClick}
                  // id="checkout-button-price_1IbVRqSGnbQ252OAatfNnl0H"
                >
                  Checkout
                </Button>
                {/* <ButtonCustom
                  block={false}
                  size="md"
                  parentfunction={handleCheckout}
                  buttonContent="Checkout Now"
                /> */}
                <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
                  <CardElement />
                  <button>Pay</button>
                </form>
              </Col>
            </Row>
          </Card>
        </Container>
      </div>
    </Styled>
  );
};

export default Checkout;
