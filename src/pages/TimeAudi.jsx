import React, { useState, useEffect } from "react";
import { Col, Container, Row, Card } from "react-bootstrap";
import styled from "styled-components";
import axios from "axios";

const Styled = styled.div`
  .background-photo {
    background-image: url("https://images.unsplash.com/photo-1502570149819-b2260483d302?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1950&q=80");
  }
`;

const TimeAudi = () => {
  const [timingsAvailable, setTimingsAvailable] = useState([]);
  const date = localStorage.getItem("date");

  useEffect(() => {
    axios.get(`/baudis/${date}`).then((res) => {
      setTimingsAvailable(res.data);
    });
  }, [date]);

  return (
    <Styled>
      <div className="background-photo">
        <Container className="p-5">
          <h3 className="text-center mb-4" style={{ color: "#fff" }}>
            Please select a time slot :{" "}
          </h3>
          {timingsAvailable.map((timing, i) => (
            <Row className="m-3 text-center" key={i}>
              <Col className="text-center" md="12">
                <label style={{ width: "40%" }} className="mx-5">
                  <input
                    type="radio"
                    name="timing"
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
        </Container>
      </div>
    </Styled>
  );
};

export default TimeAudi;
