import React from "react";
import { Link } from "react-router-dom";
import style from "../styles/Navbar.module.css";

function Navbar() {
  return (
    <div className={style.container}>
      <Link to="/" className={style.link}>
        Search
      </Link>
      <br />
      <Link to="/playlists" className={style.link}>
        Playlists
      </Link>
      <br />
      <Link to="/favorites" className={style.link}>
        Favorites
      </Link>
      <br />
      <Link to="/login" className={style.link}>
        Login
      </Link>
    </div>
  );
}

export default Navbar;
