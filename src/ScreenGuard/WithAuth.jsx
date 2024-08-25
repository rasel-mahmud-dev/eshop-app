import React from "react";
import { useAuthStore } from "../store";
import Loader from "../components/Loader/Loader";
import LoginPage from "../screen/auth/Login";

const WithAuth = (HOC) => {


  return function(props) {

    const { auth, authLoaded } = useAuthStore();

    if (!authLoaded) return <Loader />;

    if (authLoaded && !auth) {
      return (
        <LoginPage {...props} />
      );
    }

    return <HOC {...props} />;

  };
};

export default WithAuth;
