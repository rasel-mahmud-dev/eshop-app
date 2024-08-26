import React from "react";
import BottomNav from "../BottomNav";

const HomeLayout = (Hoc) => {
  return function(props){
    return (
      <>
        <Hoc {...props} />
        <BottomNav />
      </>
    );
  }
};

export default HomeLayout;
