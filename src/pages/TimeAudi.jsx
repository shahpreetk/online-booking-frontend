import React, { useState, useEffect } from "react";
import {
  Col,
  Container,
  Row,
  Card,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import axios from "axios";

const TimeAudi = () => {
  const [timingsAvailable, setTimingsAvailable] = useState([]);
  const date = localStorage.getItem("date");

  useEffect(() => {
    axios.get(`/baudis/${date}`).then((res) => {
      setTimingsAvailable(res.data);
    });
  }, [date]);

  return (
    <Container className="p-5">
      <h3 className="text-center mb-4">Please select a time slot: </h3>
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
  );
};

export default TimeAudi;
