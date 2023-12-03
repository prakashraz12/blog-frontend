import React from "react";
import { Navigate } from "react-router-dom";

const AuthLayout = ({ children }) => {
  const isAuth = true;
  return <div>{ children }</div>;
};

export default AuthLayout;
