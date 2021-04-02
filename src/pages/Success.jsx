import React, { useEffect, useContext } from "react";
import AuthContext from "../context/auth/authContext";

const Success = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);
  return <div>Woohoo! Booked!</div>;
};

export default Success;
