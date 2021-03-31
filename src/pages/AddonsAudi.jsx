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

const AddonsAudi = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [addons, setAddons] = useState([]);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    setAddons(addonsAudi);
    setIsLoading(false);
    //eslint-disable-next-line
  }, []);

  return (
    // <Styled>
    <div className="background-photo">
      <Container className="p-5">
        <Row>
          <Col md={3} className="p-0 m-0">
            <Link to={ROUTES.TIMEOFAUDI}>
              <h5>
                <FaArrowLeft size={20} style={{ marginBottom: "5px" }} />
                &nbsp; Back
              </h5>
            </Link>
          </Col>
          <Col md={9}>
            <h3 className="mb-4" style={{ paddingLeft: "30px" }}>
              Any Addons that may interest you?{" "}
            </h3>
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
                          <Card.Text>{price}</Card.Text>
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
          <Link to={ROUTES.ADDONSAUDI}>
            <ButtonCustom
              block={false}
              size="md"
              parentfunction={(e) => console.log(e.target.value)}
              buttonContent="Proceed to Checkout"
            />
          </Link>
        </div>
      </Container>
    </div>
    // </Styled>
  );
};

export default AddonsAudi;
