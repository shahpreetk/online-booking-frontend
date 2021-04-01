//@ts-check
import React, { useState, useEffect, useContext } from "react";
import { Col, Container, Row, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import ButtonCustom from "../components/ButtonCustom";
import styled from "styled-components";
import * as ROUTES from "../constants/routes";
import AuthContext from "../context/auth/authContext";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { SingleDatePicker } from "react-dates";
import axios from "axios";
import moment from "moment";
import toast from "react-hot-toast";

const Styled = styled.div`
  .background-photo {
    background-image: url("https://images.unsplash.com/photo-1600463405632-943a7b68c16a?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80");
  }
`;

const BookingPage = () => {
  const history = useHistory();
  const [date, setDate] = useState(null);
  const [focused, setFocused] = useState(null);
  const [result, setResult] = useState(null);
  const authContext = useContext(AuthContext);

  const FindAudiTime = () => {
    if (!result) {
      return toast.error("Please select a date");
    }
    axios
      .get(`/baudis/${result}`)
      .then((res) => {
        if (res.data.length === 0) {
          toast.error(
            "Sorry no slots available for this date. Please select another date"
          );
        } else {
          localStorage.setItem("date", result);
          history.push(ROUTES.TIMEOFAUDI);
        }
      })
      .catch((err) => toast.error("Error sending request. Please try again."));
  };

  const FindTurfTime = () => {
    if (!result) {
      return toast.error("Please select a date");
    }
    axios
      .get(`/bturfs/${result}`)
      .then((res) => {
        if (res.data.length === 0) {
          toast.error(
            "Sorry no slots available for this date. Please select another date"
          );
        } else {
          localStorage.setItem("date", result);
          history.push(ROUTES.TIMEOFTURF);
        }
      })
      .catch((err) => toast.error("Error sending request. Please try again."));
  };

  useEffect(() => {
    document.title = "Book Now - BookIt";
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

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
                    <ButtonCustom
                      block={false}
                      size="md"
                      parentfunction={FindAudiTime}
                      buttonContent="Book Audi"
                    />
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
                    <ButtonCustom
                      block={false}
                      size="md"
                      parentfunction={FindTurfTime}
                      buttonContent="Book Turf"
                    />
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
