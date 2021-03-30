//@ts-check
import React, { useState, useEffect, useContext } from "react";
import { Col, Container, Row, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import ButtonCustom from "../components/ButtonCustom";
import styled from "styled-components";
import * as ROUTES from "../constants/routes";
import AuthContext from "../context/auth/authContext";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { SingleDatePicker } from "react-dates";
import axios from "axios";
import moment from "moment";

const Styled = styled.div`
  .auth-container {
    background-color: aqua;
  }
  .background-photo {
    background-image: url("https://images.unsplash.com/photo-1600463405632-943a7b68c16a?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80");
    height: 90vh;
  }
`;

const BookingPage = () => {
  const [date, setDate] = useState(null);
  const [focused, setFocused] = useState(null);
  const [result, setResult] = useState(null);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    document.title = "Book Now - BookIt";
    authContext.loadUser();
    axios.get(`/baudis/${result}`).then((res) => console.log(res.data));
    // eslint-disable-next-line
  }, [date]);

  return (
    <>
      <Styled>
        <div className="background-photo">
          <Container className="p-5">
            <Row className="m-3">
              <Col className="text-center">
                <SingleDatePicker
                  date={date}
                  onDateChange={(date) => {
                    setDate(date);
                    const formatted = moment(date).format("YYYY-DD-MM");
                    setResult(formatted);
                  }}
                  focused={focused}
                  onFocusChange={({ focused }) => setFocused(focused)}
                  displayFormat="DD/MM/YYYY"
                  id="date"
                  numberOfMonths={1}
                />
              </Col>
            </Row>
            <Row className="m-3">
              <Col>
                <Card className="text-center my-3 border-0 shadow-lg">
                  <Card.Body>
                    <Card.Title>Audi</Card.Title>
                    <Card.Text>
                      Book your event at our fully Air-Conditioned, 250 seating
                      + podium available auditorium now!
                    </Card.Text>
                    <Link to={ROUTES.AUDI}>
                      <ButtonCustom
                        block={false}
                        size="md"
                        buttonContent="Book Audi"
                      />
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row className="m-3">
              <Col>
                <Card className="text-center my-3 border-0 shadow-lg">
                  <Card.Body>
                    <Card.Title>Turf</Card.Title>
                    <Card.Text>
                      Need a break from study/work? Come enjoy a came of
                      cricket/football with your friends at KJSIEIT's turf!
                    </Card.Text>
                    <Link to={ROUTES.TURF}>
                      <ButtonCustom
                        block={false}
                        size="md"
                        buttonContent="Book Turf"
                      />
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </Styled>
    </>
  );
};

export default BookingPage;
