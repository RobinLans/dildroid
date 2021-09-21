import { BrowserRouter as Router, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, Segment, Sidebar } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import Searchbar from "./components/Searchbar";
import Navbar from "./components/Navbar";
import Playlists from "./components/Playlists";
import UserPlaylist from "./components/UserPlaylist";
import style from "./styles/App.module.css";

function App() {
  const [activeItem, setActiveItem] = useState("/");
  const [userObject, setUserObject] = useState(
    JSON.parse(localStorage.getItem("user_object"))
  );

  useEffect(() => {
    setActiveItem(window.location.pathname);
  }, [window.location.pathname]);

  function handleItemClick(e, { name }) {
    name === "home" ? setActiveItem("/") : setActiveItem("/" + name);
  }

  return (
    <div className="App">
      <body>
        <Router>
          <Navbar />
          <main>
            <PrivateRoute path="/" exact component={Searchbar} />
            <Route path="/login" component={Login} />
            <PrivateRoute path="/playlists" component={Playlists} />
            <PrivateRoute path="/user-playlist/:id" component={UserPlaylist} />
          </main>
        </Router>
      </body>
    </div>
  );
}

export default App;
