import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <Link to="/">Search</Link>
      <br />
      <Link to="/Playlists">Playlists</Link>
      <br />
      <Link to="/Favourites">Favourites</Link>
      <br />
      <Link to="/login">Login</Link>
    </div>
  );
}

export default Navbar;
