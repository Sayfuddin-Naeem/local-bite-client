import React from "react";
import { Outlet } from "react-router";

function PrivateRoute() {
  return (
    <>
      <h1>Private Route</h1>
      <Outlet></Outlet>
    </>
  );
}

export default PrivateRoute;
