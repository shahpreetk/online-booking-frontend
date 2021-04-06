//@ts-check
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import { Col, Container, Row, Card } from "react-bootstrap";
import ButtonCustom from "../components/ButtonCustom";
import { FaArrowLeft } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import AuthContext from "../context/auth/authContext";
import { addonsAudi } from "../utils/addonsAudi";
import formatPrice from "../utils/formatPrice";
import AddToCart from "../components/AddToCart";
import RemoveFromCart from "../components/RemoveFromCart";
import { useShoppingCart } from "use-shopping-cart";

const AddonsAudi = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [somaiya, setSomaiya] = useState(false);
  const [addons, setAddons] = useState([]);
  const authContext = useContext(AuthContext);
  const { clearCart } = useShoppingCart();

  const handleGoingback = () => {
    localStorage.setItem("time", "");
    localStorage.setItem("book", "");
    clearCart();
  };

  const checkEmail = () => {
    const email = localStorage.getItem("email");
    const isSomaiya = email.split("@")[1];
    if (isSomaiya === "somaiya.edu") {
      setSomaiya(true);
    } else setSomaiya(false);
  };

  useEffect(() => {
    authContext.loadUser();
    checkEmail();
    setAddons(addonsAudi);
    setIsLoading(false);
    //eslint-disable-next-line
  }, []);

  return (
    <Container className="p-5">
      <Row>
        <Col md={3} className="p-0 m-0">
          <Link to={ROUTES.TIMEOFAUDI} onClick={handleGoingback}>
            <h5>
              <FaArrowLeft size={20} style={{ marginBottom: "5px" }} />
              &nbsp; Back
            </h5>
          </Link>
        </Col>
        <Col md={6}>
          <h3 className="mb-4" style={{ paddingLeft: "30px" }}>
            Any Addons that may interest you?{" "}
          </h3>
        </Col>
        <Col md={3}>
          <div className="text-right">
            <Link to={ROUTES.CHECKOUT}>
              <ButtonCustom
                block={false}
                size="md"
                parentfunction={(e) => console.log(e.target.value)}
                buttonContent="Proceed to Checkout"
              />
            </Link>
          </div>
        </Col>
      </Row>
      {isLoading ? (
        <Skeleton count={5} height={150} className="my-3" />
      ) : (
        <>
          <Row className="m-3 text-center">
            {addons.map((addon) => {
              const price = formatPrice(addon);
              return (
                <Col className="text-center" md="6" key={addon.id}>
                  <label style={{ width: "70%" }} className="mx-5">
                    <Card
                      className="text-center"
                      style={{ margin: "10px", padding: "0px" }}
                    >
                      <Card.Header>{addon.title}</Card.Header>
                      <Card.Body>
                        <Card.Text>{addon.description}</Card.Text>
                        <Card.Text>{somaiya ? "₹1.00" : price}</Card.Text>
                        <AddToCart addon={addon} />
                        <RemoveFromCart addon={addon} />
                      </Card.Body>
                    </Card>
                  </label>
                </Col>
              );
            })}
          </Row>
        </>
      )}
      <div className="text-center mt-4">
        <Link to={ROUTES.CHECKOUT}>
          <ButtonCustom
            block={false}
            size="md"
            parentfunction={(e) => console.log(e.target.value)}
            buttonContent="Proceed to Checkout"
          />
        </Link>
      </div>
    </Container>
  );
};

export default AddonsAudi;
