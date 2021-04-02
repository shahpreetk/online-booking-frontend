//@ts-check
import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import AuthContext from "../context/auth/authContext";

const NotFound = () => {
  const authContext = useContext(AuthContext);
  useEffect(() => {
    document.title = "404 - Not Found | BookIt";
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="container mx-auto flex items-center bg-gray-200 my-5">
      <div className="mx-auto flex max-w-screen-lg flex-col">
        <p className="text-center text-2xl">Lost your way around here?</p>
        <p className="text-center text-xl">
          Let's take you back{" "}
          <Link to={ROUTES.HOME} className="font-bold text-blue-500">
            home
          </Link>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
