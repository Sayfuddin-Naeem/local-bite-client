import React, { useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../providers/AuthProvider";
import LoadingState from "../components/shared/LoadingState/LoadingState";

function PublicRoute() {
  const [loading, setLoading] = useState(true);
  const { fbUser } = useAuth();

  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  
  if(loading){
    return <LoadingState time={0.3} setLoading={setLoading} />;
  }
  return (
    <>
      {fbUser ? (
        <Navigate to={from} replace />
      ) : (
        <Outlet></Outlet>
      )}
    </>
  );
}

export default PublicRoute;
