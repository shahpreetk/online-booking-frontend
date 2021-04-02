//@ts-check
import React from "react";
// bootstrap imports
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
// styled components
import styled from "styled-components";

const Styles = styled.div`
  .main-footer {
    background-color: #9ca3af;
    color: #4b5563;
    /* font-family: 'Bitter', serif; */
    letter-spacing: 1px;
  }
  .footer-copyright-text {
    background-color: #d1d5db;
    color: #1f2937;
    /* font-family: 'Work Sans', sans-serif; */
  }
  a {
    color: #204e56;
    text-decoration: none;
    &:hover {
      color: #204e56;
      text-decoration: none;
    }
  }
  .foot-header {
    color: #374151 !important;
  }
  .foot-para {
    color: #0f172a !important;
  }
`;

const Footer = () => {
  return (
    <>
      <Styles>
        <footer className="page-footer font-small">
          <div className="container-fluid text-center text-center main-footer">
            <Container>
              <div className="row">
                {/* <hr className="clearfix w-100 d-md-none pb-3" /> */}
                <div className="m-2 mb-md-0 mb-3">
                  <h5 className="font-weight-bold pt-2 foot-header">
                    An initiative by EXTC Department of KJSIEIT
                  </h5>
                  <p className="foot-para">
                    Address: K. J. Somaiya Institute of Engineering & I.T.,
                    Somaiya Ayurvihar Complex Eastern Express Highway Near
                    Everard Nagar, Sion East, Mumbai, Maharashtra 400022
                  </p>
                </div>
              </div>
            </Container>
          </div>
          <div className="footer-copyright-text text-center py-2 sticky-footer-wrapper">
            Find the project{" "}
            <a
              rel="noreferrer"
              target="_blank"
              href="https://github.com/shahpreetk/online-booking-frontend"
            >
              {/* <a
              rel="noreferrer"
              target="_blank"
              href="https://kjsieit-onlinebooking.netlify.app/"
            > */}
              <Button variant="outline-dark" className="shadow-none">
                here
              </Button>
            </a>
          </div>
        </footer>
      </Styles>
    </>
  );
};

export default Footer;
