import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login";
import Searchbar from "./components/Searchbar";
import Navbar from "./components/Navbar";
import Playlists from "./components/Playlists";
import UserPlaylist from "./components/UserPlaylist";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Route path="/" exact component={Searchbar}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/playlists" component={Playlists}></Route>
        <Route path="/user-playlist/:id" component={UserPlaylist} />
      </Router>
    </div>
  );
}

export default App;
