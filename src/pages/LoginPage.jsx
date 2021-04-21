//@ts-check
import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import { Button, Card, Container, Form } from "react-bootstrap";
import styled from "styled-components";
import AuthContext from "../context/auth/authContext";
import toast from "react-hot-toast";

const Styled = styled.div`
  .background-photo {
    background-image: url("https://images.unsplash.com/photo-1600463405632-943a7b68c16a?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80");
  }
`;

const LoginPage = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { email, password } = user;
  const isInvalid = password === "" || email === "";
  const history = useHistory();
  const authContext = useContext(AuthContext);
  const { login, error, clearErrors, token } = authContext;

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (isInvalid) {
      toast.error("Please fill in all fields");
    } else {
      login({ email, password });
      setIsLoading(true);
    }
  };

  useEffect(() => {
    document.title = "Login | BookIt";

    if (token && token !== "undefined") {
      history.push(ROUTES.BOOKING);
    }
    if (error) {
      toast.error(error);
      clearErrors();
      setIsLoading(false);
    }
  }, [clearErrors, error, token, history]);
  return (
    <>
      <Styled>
        <div className="background-photo">
          <Container className="p-5">
            <Card
              className="m-5 p-5 border-0 shadow-lg"
              style={{ zIndex: 100, backgroundColor: "#f1f5f9" }}
            >
              <Card.Body>
                <Card.Title>
                  <h3 className="text-center mb-4 mt-0">Login</h3>
                </Card.Title>

                <Form onSubmit={onSubmit} method="POST">
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      required
                      placeholder="Enter email"
                      aria-label="Enter your email address"
                      value={email}
                      name="email"
                      onChange={onChange}
                    />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      aria-label="Enter your password"
                      type="password"
                      required
                      placeholder="Password"
                      value={password}
                      name="password"
                      onChange={onChange}
                    />
                  </Form.Group>
                  <Button
                    disabled={isInvalid}
                    className={`text-white w-full rounded h-8 font-bold ${
                      isInvalid && "cursor-not-allowed opacity-50"
                    }`}
                    value="Login"
                    type="submit"
                    style={{ backgroundColor: "#a72329", border: "none" }}
                  >
                    {!isInvalid && isLoading ? "Processing ..." : "Log In"}
                  </Button>
                  <Form.Group>
                    <p className="text-sm mt-3">
                      Don't have an account?{" "}
                      <Link
                        to={ROUTES.SIGN_UP}
                        className="font-bold"
                        style={{ color: "#8c1f23", fontWeight: 600 }}
                      >
                        Sign Up
                      </Link>
                    </p>
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </Container>
        </div>
      </Styled>
    </>
  );
};

export default LoginPage;
