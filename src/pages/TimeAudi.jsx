// @ts-check
import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import { Col, Container, Row, Card, Button } from "react-bootstrap";
import styled from "styled-components";
import axios from "axios";
import ButtonCustom from "../components/ButtonCustom";
import { FaArrowLeft } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import AuthContext from "../context/auth/authContext";
import toast from "react-hot-toast";
import { useShoppingCart } from "use-shopping-cart";
import { FaCheck, FaTimes } from "react-icons/fa";

const Styled = styled.div`
  .background-photo {
    background: black;
    overflow: hidden;
    background: -webkit-linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
      url("https://images.unsplash.com/photo-1502570149819-b2260483d302?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1950&q=80");
    object-fit: "cover";
  }
`;

const TimeAudi = () => {
  const [timingsAvailable, setTimingsAvailable] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [chosenTime, setChosenTime] = useState([]);
  const [somaiya, setSomaiya] = useState(false);
  const date = localStorage.getItem("date");
  const authContext = useContext(AuthContext);
  const history = useHistory();
  const { addItem } = useShoppingCart();

  const handleGoingback = () => {
    localStorage.setItem("date", "");
  };

  const checkEmail = () => {
  const email = localStorage.getItem("email");
  const isSomaiya = email.split("@")[1];
  if (isSomaiya === "somaiya.edu") {
    setSomaiya(true);
  } else setSomaiya(false);
};

  const goingToAddons = () => {
    if (chosenTime.length === 0) {
      return toast.error("Please select a time slot");
    } else {
      localStorage.setItem("time", JSON.stringify(chosenTime));
      localStorage.setItem("book", "audi");
      const book = {
        id: 1,
        title: "Auditorium",
        name: "Auditorium",
        description: "Auditorium per hour booking rate is ₹10000",
        price: somaiya ? 100 : 1000000,
        inCart: true,
        currency: "INR",
        sku: "1",
      };
      addItem(book, chosenTime.length);
      history.push(ROUTES.ADDONSAUDI);
    }
  };

  const handleAddTime = (timing) => {
    const duplicate = chosenTime.find((el) => el === timing);
    if (!duplicate) {
      const newTime = chosenTime.slice(0);
      newTime.push(timing);
      toast.success(`${timing} selected`);
      return setChosenTime(newTime);
    } else {
      toast.error("Time already selected");
    }
  };

  const handleRemoveTime = (timing) => {
    const newTime = chosenTime.filter((el) => el !== timing);
    toast.success(`${timing} removed`);
    return setChosenTime(newTime);
  };

  useEffect(() => {
    checkEmail()
    axios.get(`/baudis/${date}`).then((res) => {
      setIsLoading(false);
      setTimingsAvailable(res.data);
      authContext.loadUser();
    });
    // eslint-disable-next-line
  }, [date]);

  return (
    <Styled>
      <div className="background-photo">
        <Container className="p-5">
          <Row>
            <Col md={4}>
              <Link
                to={ROUTES.BOOKING}
                onClick={handleGoingback}
                style={{ color: "#fff" }}
              >
                <h5 style={{ color: "#fff" }}>
                  <FaArrowLeft size={20} style={{ marginBottom: "5px" }} />
                  &nbsp; Back
                </h5>
              </Link>
            </Col>
            <Col md={4}>
              <h3
                className="mb-4"
                style={{ color: "#fff", paddingLeft: "25px" }}
              >
                Please select a time slot :{" "}
              </h3>
            </Col>
            <Col md={4}>
              <div className="text-right">
                <ButtonCustom
                  block={false}
                  size="md"
                  parentfunction={goingToAddons}
                  buttonContent="Proceed"
                />
              </div>
            </Col>
          </Row>
          {isLoading ? (
            <Skeleton count={5} height={150} className="my-3" />
          ) : (
            <>
              <Row className="text-center mb-3">
                {timingsAvailable.map((timing, i) => (
                  <Col className="text-center" md="6" key={i}>
                    <Card
                      className="panel panel-default card-input rounded mx-5"
                      style={{ margin: "10px", padding: "0px" }}
                    >
                      <Card.Header className="panel-heading">
                        Slot {i + 1}
                      </Card.Header>
                      <Card.Body className="panel-body">
                        <Card.Text>{timing}</Card.Text>
                        <Card.Text>
                          <Button
                            // disabled={disabledAdd}
                            className="flex ml-auto border-0 py-2 px-2 rounded m-1"
                            onClick={() => handleAddTime(timing)}
                            value={timing}
                            variant="warning"
                          >
                            <span>
                              <FaCheck size={12} />
                            </span>
                          </Button>
                          <Button
                            // disabled={disabledRemove}
                            className="flex ml-auto border-0 py-2 px-2 rounded m-1"
                            onClick={() => handleRemoveTime(timing)}
                            value={timing}
                            variant="danger"
                          >
                            <span>
                              <FaTimes size={12} />
                            </span>
                          </Button>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </>
          )}
          <div className="text-center mb-0">
            <ButtonCustom
              block={false}
              size="md"
              parentfunction={goingToAddons}
              buttonContent="Proceed"
            />
          </div>
        </Container>
      </div>
    </Styled>
  );
};

export default TimeAudi;
