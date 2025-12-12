import React, { useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../providers/AuthProvider";
import LoadingState from "../components/shared/LoadingState/LoadingState";


function PrivateRoute() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { fbUser } = useAuth();

  if(loading){
      return <LoadingState time={0.3} setLoading={setLoading} />;
    }
  return (
    <>
      {fbUser ? (
        <Outlet></Outlet>
      ) : (
        <Navigate to={"/signin"} state={{ from: location }} replace />
      )}
    </>
  );
}

export default PrivateRoute;