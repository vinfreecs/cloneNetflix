import React, { useState, useEffect } from "react";
import "./Navbar.css";
function Navbar() {
  const [show, handleShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
    // return () => {
    //   window.removeEventListener("scroll");
    // };
  }, []);
  return (
    <div className={`nav ${show && "nav_black"}`}>
      <img
        className="nav_logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png"
        alt="Netflix logo"
      ></img>
      <img
        className="nav_profile_avatar"
        src="https://i.pinimg.com/originals/34/62/d2/3462d27440aa255b1c314ff16f4032b4.png"
        alt="profile"
      />
    </div>
  );
}

export default Navbar;
