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

const SignUpPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const authContext = useContext(AuthContext);
  const { register, error, clearErrors, isAuthenticated } = authContext;

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
  });
  const { name, email, password, age } = user;
  const isInvalid =
    password === "" || email === "" || age === "" || name === "";
  const history = useHistory();

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    register({ name, email, password, age });
    setIsLoading(true);
  };
  useEffect(() => {
    document.title = "SignUp | BookIt";

    if (isAuthenticated) {
      history.push(ROUTES.BOOKING);
    }
    if (error) {
      toast.error(error);
      clearErrors();
      setIsLoading(false);
    }
  }, [clearErrors, error, isAuthenticated, history]);
  return (
    <>
      <Styled>
        <div className="background-photo">
          <Container className="p-4">
            <Card
              className="m-4 p-5 border-0 shadow-lg"
              style={{ zIndex: 100, backgroundColor: "#f1f5f9" }}
            >
              <Card.Body>
                <Card.Title>
                  <h3 className="text-center mb-4 mt-0">Sign Up</h3>
                </Card.Title>
                <Form onSubmit={onSubmit} method="POST">
                  <Form.Group controlId="formBasicName">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter name"
                      aria-label="Enter your name"
                      value={name}
                      name="name"
                      required
                      onChange={onChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      aria-label="Enter your email address"
                      value={email}
                      required
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
                      placeholder="Password"
                      required
                      // @ts-ignore
                      minLength="7"
                      name="password"
                      value={password}
                      onChange={onChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicAge">
                    <Form.Label>Age</Form.Label>
                    <Form.Control
                      aria-label="Enter your password"
                      type="text"
                      placeholder="Age"
                      required
                      value={age}
                      name="age"
                      onChange={onChange}
                    />
                  </Form.Group>
                  <Button
                    disabled={isInvalid}
                    className={`text-white w-full rounded h-8 font-bold ${
                      isInvalid && "cursor-not-allowed opacity-50"
                    }`}
                    value="Sign Up"
                    type="submit"
                    style={{ backgroundColor: "#a72329", border: "none" }}
                  >
                    {isLoading ? "Processing ..." : "Sign Up"}
                  </Button>
                  <Form.Group>
                    <p className="text-sm mt-3">
                      Don't have an account?{" "}
                      <Link
                        to={ROUTES.LOGIN}
                        className="font-bold"
                        style={{ color: "#8c1f23", fontWeight: 600 }}
                      >
                        Log In
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

export default SignUpPage;
