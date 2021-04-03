// @ts-check
import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Col, Row, Card, Button } from "react-bootstrap";
import { useShoppingCart } from "use-shopping-cart";
import formatPrice, { formatValue } from "../utils/formatPrice";
import AuthContext from "../context/auth/authContext";
import styled from "styled-components";
import RemoveFromCart from "../components/RemoveFromCart";
import { FaTimes } from "react-icons/fa";
import * as ROUTES from "../constants/routes";
import axios from "axios";
import toast from "react-hot-toast";
import { useStripe } from "@stripe/react-stripe-js";

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
  const stripe = useStripe();
  const [disabled, setDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const clearFullCart = () => {
    clearCart();
    localStorage.setItem("date", "");
    localStorage.setItem("book", "");
    localStorage.setItem("time", "");
    history.push(ROUTES.BOOKING);
  };

  const fetchCheckoutSession = async ({ quantity, amount, email }) => {
    const book = {
      quantity,
      amount,
      email,
    };

    return axios.post("/checkout-sessions", book).then((res) => {
      return res.data;
    });
  };

  const handleClick = async (event) => {
    setIsLoading(true);
    setDisabled(true);
    if (cartCount === 0 && totalPrice === 0 && cartItems.length === 0) {
      setDisabled(true);
      setIsLoading(false);
      return toast.error("Cart is empty. Please select items");
    }
    if (totalPrice < 500000) {
      setDisabled(true);
      setIsLoading(false);
      return toast.error("Please select the Turf or Auditorium");
    }
    const { sessionId } = await fetchCheckoutSession({
      quantity: 1,
      amount: totalPrice,
      email: localStorage.getItem("email"),
    });
    const { error } = await stripe.redirectToCheckout({
      sessionId,
    });
    setIsLoading(false);
    if (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    authContext.loadUser();
    setIsLoading(false);
    setDisabled(false);
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
              <Col md={3}></Col>
              <Col md={6}>
                <h3 className="text-center">Cart Summary</h3>
              </Col>
              <Col md={3}>
                <div className="text-right">
                  <p aria-label="Clear Cart" title="Clear Cart">
                    <Button
                      onClick={clearFullCart}
                      className="text-center"
                      variant="light"
                    >
                      Clear Cart <FaTimes />
                    </Button>
                  </p>
                </div>
              </Col>
            </Row>
            <Row className="ml-3">
              <Col>
                <p>
                  {cartCount === 1
                    ? cartCount + " Cart Item : "
                    : cartCount + " Cart Items : "}
                </p>
              </Col>
            </Row>
            <Row className="mx-3 my-0">
              {cartItems.map((cartItem) => {
                const price = formatPrice(cartItem);
                const value = formatValue(cartItem);
                return (
                  <Col key={cartItem.id} md={12} className="my-3">
                    <Row>
                      <Col className="text-left" md={6}>
                        <h6>{cartItem.title}</h6>
                        {cartItem.title !== "Auditorium" &&
                        cartItem.title !== "Turf" ? (
                          <RemoveFromCart addon={cartItem} />
                        ) : null}
                      </Col>
                      <Col className="text-right" md={6}>
                        <span className="text-muted text-right">
                          {price} * {cartItem.quantity} = {value}
                        </span>
                      </Col>
                    </Row>
                  </Col>
                );
              })}
              <Col className="text-left mt-3" md={6}>
                <h5 className="font-weight-bold">Total Price :</h5>
              </Col>
              <Col className="text-right mt-3" md={6}>
                <h5 className="text-right font-weight-bold">
                  {formattedTotalPrice}
                </h5>
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
                  disabled={disabled}
                  // @ts-ignore
                  onClick={handleClick}
                >
                  {isLoading ? "Processing..." : "Checkout"}
                </Button>
              </Col>
            </Row>
          </Card>
        </Container>
      </div>
    </Styled>
  );
};

export default Checkout;
