import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <Link to="/">Search</Link>
      <br />
      <Link to="/playlists">Playlists</Link>
      <br />
      <Link to="/favorites">Favorites</Link>
      <br />
      <Link to="/login">Login</Link>
    </div>
  );
}

export default Navbar;
