import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/auth/authContext";
import { Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import toast from "react-hot-toast";
import { formatCurrencyString } from "use-shopping-cart";

const ProfilePage = () => {
  const authContext = useContext(AuthContext);
  const [audiBookings, setAudiBookings] = useState([]);
  const [turfBookings, setTurfBookings] = useState([]);

  function formatPrice(booking) {
    console.log(booking);
    return formatCurrencyString({
      value: booking.cost,
      currency: "INR",
      language: navigator.language,
    });
  }

  const getAudi = async () => {
    const result = await axios
      .get("/baudis")
      .then((res) => setAudiBookings(res.data))
      .catch((err) => toast.error("Error getting Auditorium bookings."));
    return result;
  };

  const getTurf = async () => {
    const result = await axios
      .get("/bTurfs")
      .then((res) => setTurfBookings(res.data))
      .catch((err) => toast.error("Error getting Turf bookings."));
    return result;
  };
  console.log(audiBookings);
  useEffect(() => {
    authContext.loadUser();
    getAudi();
    getTurf();
    // eslint-disable-next-line
  }, []);
  return (
    <Container className="py-4 px-6">
      <Row className="pt-4 pb-2">
        <Col>
          <h4>Hey, {localStorage.getItem("name")}!</h4>
        </Col>
      </Row>
      {audiBookings.length !== 0 ? (
        <>
          <h5 className="mt-4 mb-2">Your Auditorium Bookings</h5>
          <Row>
            {audiBookings.map((booking) => {
              const price = formatPrice(booking);
              return (
                <Col md={6}>
                  <Card className="my-3 border-0 shadow-sm">
                    <Card.Body>
                      <Card.Title>Booking for : {booking.date}</Card.Title>
                      <Card.Text>Time : {booking.time}</Card.Text>
                      <Card.Text>
                        Addons :{" "}
                        {booking.addons.length !== 0
                          ? booking.addons.map((addon) => addon.title + ", ")
                          : "No addons were selected"}
                      </Card.Text>
                      <Card.Subtitle>{price}</Card.Subtitle>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </>
      ) : (
        <h5 className="mt-4 mb-3">You have no Auditorium Bookings</h5>
      )}
      {turfBookings.length !== 0 ? (
        <>
          <h5 className="mt-4 mb-3">Your Turf Bookings</h5>
          {turfBookings.map((booking) => {
            const price = formatPrice(booking);
            return (
              <Col md={6}>
                <Card className="my-3 border-0 shadow-sm">
                  <Card.Body>
                    <Card.Title>Booking for : {booking.date}</Card.Title>
                    <Card.Text>Time : {booking.time}</Card.Text>
                    <Card.Text>
                      Addons :{" "}
                      {booking.addons.length !== 0
                        ? booking.addons.map((addon) => addon.title + ", ")
                        : "No addons were selected"}
                    </Card.Text>
                    <Card.Subtitle>{price}</Card.Subtitle>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </>
      ) : (
        <h5 className="mt-4 mb-3">You have no Turf Bookings</h5>
      )}
    </Container>
  );
};

export default ProfilePage;
