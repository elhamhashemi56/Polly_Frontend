import React from "react";
import "./NotFound.css";
import NotFoundImage from "../img/error-2129569_640.jpg";
const NotFound = () => {
  return (
    <div>
      <div className="notfound">
        <img src={NotFoundImage} alt="Not Found" className="notfoundimg" />
      </div>
      <div className="notfoundtxt">NOT FOUND</div>
    </div>
  );
};

export default NotFound;
