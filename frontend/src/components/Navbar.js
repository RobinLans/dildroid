import React from "react";
import { Link } from "react-router-dom";
import style from "../styles/App.module.css"

function Navbar() {
  return (
    <div className={style.navbar}>
      <Link to="/">Search</Link>
      <br />
      <Link to="/playlists">Playlists</Link>
      <br />
      <Link to="/favorites">Favorites</Link>
      <br />
      <Link to="/login">Login</Link>
      <br />
      <Link to="/register-user">Register</Link>
    </div>
  );
}

export default Navbar;
