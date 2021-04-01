// @ts-check
import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Container, Col, Row, Card } from "react-bootstrap";
import ButtonCustom from "../components/ButtonCustom";
import { useShoppingCart } from "use-shopping-cart";
import formatPrice from "../utils/formatPrice";
import AuthContext from "../context/auth/authContext";
import styled from "styled-components";
import RemoveFromCart from "../components/RemoveFromCart";
import { AiOutlineClose } from "react-icons/ai";
import * as ROUTES from "../constants/routes";
import useCheckout from "../utils/useCheckout";

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
    clearCart,
  } = useShoppingCart();
  const authContext = useContext(AuthContext);
  const cartItems = Object.keys(cartDetails).map((key) => cartDetails[key]);
  const history = useHistory();
  const handleCheckout = useCheckout();

  const clearFullCart = () => {
    clearCart();
    localStorage.setItem("date", "");
    localStorage.setItem("book", "");
    localStorage.setItem("time", "");
    history.push(ROUTES.BOOKING);
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
                <ButtonCustom
                  block={false}
                  size="md"
                  parentfunction={handleCheckout}
                  buttonContent="Checkout Now"
                />
              </Col>
            </Row>
          </Card>
        </Container>
      </div>
    </Styled>
  );
};

export default Checkout;
