import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import { Col, Container, Row, Card } from "react-bootstrap";
import styled from "styled-components";
import axios from "axios";
import ButtonCustom from "../components/ButtonCustom";
import { FaArrowLeft } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";

const Styled = styled.div`
  .background-photo {
    background-image: url("https://images.unsplash.com/photo-1502570149819-b2260483d302?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1950&q=80");
    background: black;
    overflow: hidden;
    background: -webkit-linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
      url("https://images.unsplash.com/photo-1502570149819-b2260483d302?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1950&q=80");
    object-fit: "cover";
  }
`;

const TimeAudi = () => {
  const [timingsAvailable, setTimingsAvailable] = useState([]);
  const [chosenTime, setChosenTime] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const date = localStorage.getItem("date");

  useEffect(() => {
    axios.get(`/baudis/${date}`).then((res) => {
      setIsLoading(false);
      setTimingsAvailable(res.data);
    });
  }, [date]);
  console.log(chosenTime);
  return (
    <Styled>
      <div className="background-photo">
        <Container className="p-5">
          <Row>
            <Col md={4}>
              <Link to={ROUTES.BOOKING} style={{ color: "#fff" }}>
                <h5 style={{ color: "#fff" }}>
                  <FaArrowLeft size={20} style={{ marginBottom: "5px" }} />
                  &nbsp; Back
                </h5>
              </Link>
            </Col>
            <Col md={8}>
              <h3
                className="mb-4"
                style={{ color: "#fff", paddingLeft: "25px" }}
              >
                Please select a time slot :{" "}
              </h3>
            </Col>
          </Row>
          {isLoading ? (
            <Skeleton count={5} />
          ) : (
            <>
              {timingsAvailable.map((timing, i) => (
                <Row className="m-3 text-center" key={i}>
                  <Col className="text-center" md="12">
                    <label style={{ width: "40%" }} className="mx-5">
                      <input
                        type="radio"
                        name="timing"
                        value={timing}
                        onChange={(e) => setChosenTime(e.target.value)}
                        checked={chosenTime === timing}
                        className="card-input-element"
                        style={{ display: "none" }}
                      />
                      <Card
                        className="panel panel-default card-input rounded"
                        style={{ margin: "10px", padding: "0px" }}
                      >
                        <Card.Header className="panel-heading">
                          Slot {i + 1}
                        </Card.Header>
                        <Card.Body className="panel-body">
                          <Card.Text>{timing}</Card.Text>
                        </Card.Body>
                      </Card>
                    </label>
                  </Col>
                </Row>
              ))}
            </>
          )}
          <div className="text-center">
            <Link to={ROUTES.ADDONSAUDI}>
              <ButtonCustom
                block={false}
                size="md"
                parentfunction={() => localStorage.setItem("time", chosenTime)}
                buttonContent="Proceed"
              />
            </Link>
          </div>
        </Container>
      </div>
    </Styled>
  );
};

export default TimeAudi;