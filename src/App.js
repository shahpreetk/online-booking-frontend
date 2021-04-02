//@ts-check
import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
// Components
import Header from "./components/Header";
import Footer from "./components/Footer";

import * as ROUTES from "./constants/routes";
import AuthState from "./context/auth/AuthState";
import setAuthToken from "./utils/setAuthToken";
import PrivateRoute from "./components/PrivateRoute";
import axios from "axios";
import { CartProvider } from "use-shopping-cart";
import { Elements } from "@stripe/react-stripe-js";
// Pages
const HomePage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const BookingPage = lazy(() => import("./pages/BookingPage"));
const TimeAudi = lazy(() => import("./pages/TimeAudi"));
const AddonsAudi = lazy(() => import("./pages/AddonsAudi"));
const TimeTurf = lazy(() => import("./pages/TimeTurf"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Success = lazy(() => import("./pages/Success"));
const UnSuccessful = lazy(() => import("./pages/UnSuccessful"));
const NotFound = lazy(() => import("./pages/NotFound"));
const stripePromise = loadStripe(
  "pk_test_51IYTLkSGnbQ252OAWnErHwp2IeWlrGhOlFDh2MqsgZ9nSMgBQh0B5e2a0VvqxlsnmmhunMjp7mdnnPU40lqLH3qZ00mfGM5EAi"
);

axios.defaults.baseURL = "https://onlinebooking-backend.herokuapp.com";
// axios.defaults.baseURL = "http://localhost:3010";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <CartProvider
        mode="checkout-session"
        stripe={stripePromise}
        currency="INR"
      >
        <Elements stripe={stripePromise}>
          <Router>
            <Suspense
              fallback={
                <section>
                  <div
                    className="container m-auto flex justify-content-center"
                    style={{ height: "100vh" }}
                  >
                    <div
                      className="m-auto flex max-w-screen-lg flex-col text-center"
                      style={{ textAlign: "center" }}
                    >
                      <img
                        width="128px"
                        height="128px"
                        style={{ marginTop: "20%" }}
                        src="/assets/loader.gif"
                        alt="loader"
                      />
                    </div>
                  </div>
                </section>
              }
            >
              <Header />
              <Toaster position="bottom-center" />
              <Switch>
                <Route path={ROUTES.LOGIN} component={LoginPage} />
                <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
                <Route path={ROUTES.HOME} component={HomePage} exact />
                <PrivateRoute
                  path={ROUTES.BOOKING}
                  component={BookingPage}
                  exact
                />
                <PrivateRoute
                  path={ROUTES.TIMEOFAUDI}
                  component={TimeAudi}
                  exact
                />
                <PrivateRoute
                  path={ROUTES.ADDONSAUDI}
                  component={AddonsAudi}
                  exact
                />
                <PrivateRoute
                  path={ROUTES.TIMEOFTURF}
                  component={TimeTurf}
                  exact
                />
                <PrivateRoute
                  path={ROUTES.ADDONSTURF}
                  component={TimeTurf}
                  exact
                />
                <PrivateRoute path={ROUTES.SUCCESS} component={Success} />
                <PrivateRoute
                  path={ROUTES.UNSUCCESSFUL}
                  component={UnSuccessful}
                />
                <PrivateRoute
                  path={ROUTES.CHECKOUT}
                  component={Checkout}
                  exact
                />
                <Route component={NotFound} />
              </Switch>
              <Footer />
            </Suspense>
          </Router>
        </Elements>
      </CartProvider>
    </AuthState>
  );
};

export default App;
