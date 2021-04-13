import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/auth/authContext";
import { Badge, Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import toast from "react-hot-toast";
import { formatCurrencyString } from "use-shopping-cart";
import Skeleton from "react-loading-skeleton";

const ProfilePage = () => {
  const authContext = useContext(AuthContext);
  const [audiBookings, setAudiBookings] = useState([]);
  const [turfBookings, setTurfBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function formatPrice(booking) {
    return formatCurrencyString({
      value: booking.cost,
      currency: "INR",
      language: navigator.language,
    });
  }

  const getAudi = async () => {
    const result = await axios
      .get("/baudis")
      .then((res) => {
        setIsLoading(false);
        return setAudiBookings(res.data);
      })
      .catch((err) => toast.error("Error getting Auditorium bookings."));
    return result;
  };

  const getBadge = (date) => {
    const iso = new Date();
    const d = new Date(iso.getFullYear(), iso.getMonth(), iso.getDate());
    const myDate = new Date(date);
    if (d > myDate) {
      return (
        <div className="ml-auto">
          <Badge pill variant="danger">
            Past
          </Badge>
        </div>
      );
    } else {
      return (
        <div className="ml-auto">
          <Badge pill variant="success">
            Scheduled
          </Badge>
        </div>
      );
    }
  };

  const getTurf = async () => {
    const result = await axios
      .get("/bTurfs")
      .then((res) => {
        setIsLoading(false);
        setTurfBookings(res.data);
      })
      .catch((err) => toast.error("Error getting Turf bookings."));
    return result;
  };
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
      <h5 className="mt-4 mb-2">Your Auditorium Bookings</h5>
      {isLoading ? (
        <Skeleton count={2} height={100} />
      ) : audiBookings.length !== 0 ? (
        <>
          <Row>
            {audiBookings.map((booking) => {
              const price = formatPrice(booking);
              return (
                <Col md={6} key={booking.id}>
                  <Card className="my-3 border-0 shadow-sm">
                    <Card.Body>
                      <div className="d-flex">
                        <div>
                          <Card.Title>Booking for : {booking.date}</Card.Title>
                        </div>
                        {getBadge(booking.date)}
                      </div>
                      <Card.Text>
                        Time :{" "}
                        {booking.time.length === 1
                          ? booking.time.map((time) => time)
                          : booking.time.map((time, i) =>
                              booking.time[i] ===
                              booking.time[booking.time.length - 1]
                                ? time
                                : time + ", "
                            )}
                      </Card.Text>
                      <Card.Text>
                        Addons :{" "}
                        {booking.addons.length === 0
                          ? "No addons were selected"
                          : booking.addons.length !== 0 &&
                            booking.addons.length === 1
                          ? booking.addons.map((addon) => addon.title)
                          : booking.addons.map((addon, i) =>
                              i === booking.addons.length - 1
                                ? addon.title
                                : addon.title + ", "
                            )}
                      </Card.Text>
                      <Card.Subtitle>Cost : {price}</Card.Subtitle>
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
      <h5 className="mt-4 mb-2">Your Turf Bookings</h5>
      {isLoading ? (
        <Skeleton count={2} height={100} />
      ) : turfBookings.length !== 0 ? (
        <>
          <Row>
            {turfBookings.map((booking) => {
              const price = formatPrice(booking);
              return (
                <Col md={6} key={booking.id}>
                  <Card className="my-3 border-0 shadow-sm">
                    <Card.Body>
                      <div className="d-flex">
                        <div>
                          <Card.Title>Booking for : {booking.date}</Card.Title>
                        </div>
                        {getBadge(booking.date)}
                      </div>
                      <Card.Text>
                        Time :{" "}
                        {booking.time.length === 1
                          ? booking.time.map((time) => time)
                          : booking.time.map((time, i) =>
                              booking.time[i] ===
                              booking.time[booking.time.length - 1]
                                ? time
                                : time + ", "
                            )}
                      </Card.Text>
                      <Card.Text>
                        Addons :{" "}
                        {booking.addons.length === 0
                          ? "No addons were selected"
                          : booking.addons.length !== 0 &&
                            booking.addons.length === 1
                          ? booking.addons.map((addon) => addon.title)
                          : booking.addons.map((addon) =>
                              addon.id === booking.addons.length
                                ? addon.title
                                : addon.title + ", "
                            )}
                      </Card.Text>
                      <Card.Subtitle>Cost : {price}</Card.Subtitle>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </>
      ) : (
        <h5 className="mt-4 mb-3">You have no Turf Bookings</h5>
      )}
    </Container>
  );
};

export default ProfilePage;
