//@ts-check
import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Toaster } from "react-hot-toast";
// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
// import Alerts from "./components/Alerts";

import * as ROUTES from "./constants/routes";
// import BAudiState from "./context/bAudi/BAudiState";
import AuthState from "./context/auth/AuthState";
// import AlertState from "./context/alert/AlertState";
import setAuthToken from "./utils/setAuthToken";
import PrivateRoute from "./components/PrivateRoute";
// Pages
const HomePage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const BookingPage = lazy(() => import("./pages/BookingPage"));
// const BookAudi = lazy(() => import("./pages/BookAudi"));
// const BookTurf = lazy(() => import("./pages/BookTurf"));
const NotFound = lazy(() => import("./pages/NotFound"));

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      {/* <BAudiState> */}
      {/* <AlertState> */}
      <Router>
        <Suspense fallback={<p>Loading...</p>}>
          <Header />
          {/* <Alerts /> */}
          <Toaster position="bottom-center" />
          <Switch>
            <Route path={ROUTES.LOGIN} component={LoginPage} />
            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route path={ROUTES.HOME} component={HomePage} exact />
            <PrivateRoute path={ROUTES.BOOKING} component={BookingPage} exact />
            {/* <PrivateRoute path={ROUTES.AUDI} component={BookAudi} /> */}
            {/* <PrivateRoute path={ROUTES.TURF} component={BookTurf} /> */}
            <Route component={NotFound} />
          </Switch>
          <Footer />
        </Suspense>
      </Router>
      {/* </AlertState> */}
      {/* </BAudiState> */}
    </AuthState>
  );
};

export default App;
