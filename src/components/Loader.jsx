import React from "react";
import "../Loader.css";
export const Loader = () => {
  return (<>
    <p className="text-white relative top-16 z-50">Loading</p>
    <div className="spinner my-2 ">
      <div className="spinner1 text-white"></div>
    </div>
    </>
  );
};
