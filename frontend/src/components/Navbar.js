import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import style from "../styles/Navbar.module.css";

function Navbar(props) {
  const [showNavbar, setShowNavbar] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [hamburgerClicked, setHamburgerClicked] = useState(
    localStorage.getItem("showSidebar")
  );

  window.addEventListener("resize", () => {
    setWindowWidth(window.innerWidth);
  });

  useEffect(() => {
    console.log("hejsan din sopp");
  }, [hamburgerClicked]);

  useEffect(() => {
    if (windowWidth <= 768) {
      setShowNavbar(false);
    }
    if (windowWidth > 768) setShowNavbar(true);
  }, [windowWidth]);

  return (
    <>
      <div
        className={
          showNavbar || hamburgerClicked
            ? `${style.container}`
            : `${style.hidden}`
        }
      >
        <Link to="/" className={style.link} onClick={props.clickedLink}>
          Search
        </Link>
        <br />
        <Link
          to="/playlists"
          className={style.link}
          onClick={props.clickedLink}
        >
          Playlists
        </Link>
        <br />
        <Link to="/queue" className={style.link} onClick={props.clickedLink}>
          Queue
        </Link>
        <br />
        <Link to="/login" className={style.link} onClick={props.clickedLink}>
          Login
        </Link>
        <br />
      </div>
    </>
  );
}

export default Navbar;
