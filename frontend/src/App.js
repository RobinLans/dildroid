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
// import NewNavbar from "./components/NewNavbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import style from "./styles/App.module.css";
import Register from "./components/Register";
import Queue from "./components/Queue";

function App() {

  const [mobileView, setMobileView] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showSideBar, setShowSidebar] = useState(false);

  window.addEventListener("resize", () => {
    setWindowWidth(window.innerWidth);
  });

  useEffect(() => {
    if (windowWidth <= 768) setMobileView(true);
    if (windowWidth > 768) {
      setMobileView(false);
      setShowSidebar(false);
    }
  }, [windowWidth]);

  function clickingOnBurger() {
    setShowSidebar(true);
    localStorage.setItem("showSidebar", showSideBar);
  }

  function closingSidebar() {
    setShowSidebar(false);
    localStorage.setItem("showSidebar", showSideBar);
  }

  return (
    <div className="App">
      <body>
        <Router>
          <header>
            {(!mobileView || showSideBar) && (
              <Navbar clickedLink={closingSidebar} />
            )}
            {mobileView && !showSideBar && (
              <button className={style.burger} onClick={clickingOnBurger}>
                <FontAwesomeIcon icon={faBars} />
              </button>
            )}
            {showSideBar && mobileView && (
              <button className={style.closeSidebar} onClick={closingSidebar}>
                X
              </button>
            )}
          </header>
          <main>
            <PrivateRoute path="/" exact component={Searchbar} />
            <Route path="/login" component={Login} />
            <PrivateRoute path="/playlists" component={Playlists} />
            <PrivateRoute path="/user-playlist/:id" component={UserPlaylist} />
            <PrivateRoute path="/queue" component={Queue} />
            <Route path="/register-user" component={Register}></Route>
          </main>
        </Router>
        <div
          className={
            showSideBar && mobileView ? `${style.overlay}` : `${style.hidden}`
          }
          onClick={() => {
            setShowSidebar(false);
          }}
        ></div>
      </body>
    </div>
  );
}

export default App;
