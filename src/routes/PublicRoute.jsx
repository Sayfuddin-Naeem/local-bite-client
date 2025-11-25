import React from "react";
import { Outlet } from "react-router";

function PublicRoute() {
  return (
    <>
      <h1>Public Route</h1>
      <Outlet></Outlet>
    </>
  );
}

export default PublicRoute;
