import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Menu, Segment, Sidebar } from "semantic-ui-react";
import style from "../styles/NewNavbar.module.css";

function Navbar() {
  const [activeItem, setActiveItem] = useState("/");
  const [userObject, setUserObject] = useState(
    JSON.parse(localStorage.getItem("user_object"))
  );
  const history = useHistory();

  useEffect(() => {
    setActiveItem(window.location.pathname);
  }, [window.location.pathname]);

  function handleItemClick(e, { name }) {
    name === "home" ? setActiveItem("/") : setActiveItem("/" + name);
    history.push(name === "home" ? "/" : "/" + name);
  }

  return (
    <div className={style.container}>
      <Segment inverted>
        <Sidebar inverted pointing secondary className={style.navbar}>
          <Menu.Item
            name="home"
            active={activeItem === "/"}
            onClick={handleItemClick}
          />
          <Menu.Item
            name="playlists"
            active={activeItem === "/playlists"}
            onClick={handleItemClick}
          />
          <Menu.Item
            name="favorites"
            active={activeItem === "/favorites"}
            onClick={handleItemClick}
          />
          <Menu.Item
            name="search"
            active={activeItem === "/search"}
            onClick={handleItemClick}
          />
        </Sidebar>
      </Segment>
    </div>
  );
}

export default Navbar;
