//@ts-check
import React, { useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ButtonCustom from "./ButtonCustom";
import * as ROUTES from "../constants/routes";
import AuthContext from "../context/auth/authContext";

const Styles = styled.div`
  .navbar {
    background-color: #f1f5f9;
  }
  a,
  .navbar-brand,
  .navbar-nav .nav-item {
    color: maroon;
    font-weight: 500;
    padding: 0.5rem, 0;
    &:hover {
      color: #a72429;
      text-decoration: none;
    }
    &:active {
      text-decoration: underline;
    }
  }
  .navbar-toggler,
  .navbar-toggler-icon {
    color: #ffffff;
    border-color: #ffffff;
    background-color: #ffffff;
    &:hover {
      border-color: #fff;
    }
    &:active {
      border-color: #fff;
    }
  }
  .navbar-toggler,
  .navbar-toggler:focus,
  .navbar-toggler:active,
  .navbar-toggler-icon:focus {
    outline: none;
    border: none;
    box-shadow: none;
  }
`;

const Header = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, logout } = authContext;
  const onLogout = () => {
    logout();
    // history.push("/");
  };

  const authLinks = (
    <Nav className="ml-auto">
      <Nav.Item className="pl-2 pr-2 py-2" onClick={onLogout}>
        <a href="/">Logout</a>
      </Nav.Item>
      <Link to={ROUTES.BOOKING}>
        <ButtonCustom buttonContent="Book Now" block={false} size="sm" />
      </Link>
    </Nav>
  );

  const guestLinks = (
    <Nav className="ml-auto">
      <Nav.Item className="pl-2 pr-2 py-2">
        <Link to={ROUTES.LOGIN}>Login</Link>
      </Nav.Item>
      <Nav.Item className="pl-2 pr-2 py-2">
        <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
      </Nav.Item>
    </Nav>
  );
  return (
    <Styles>
      <Navbar className="p-3" expand="lg" style={{ zIndex: 10 }}>
        <Container>
          <Navbar.Brand href="/">
            <img
              alt="bookIt Logo"
              src="/assets/default.png"
              width="24"
              height="auto"
              className="d-inline-block align-center pb-1"
            />{" "}
            BookIt
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {isAuthenticated ? authLinks : guestLinks}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Styles>
  );
};

export default Header;
