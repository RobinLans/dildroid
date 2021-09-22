import { BrowserRouter as Router, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, Segment } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import PrivateRoute from './components/PrivateRoute';
import Login from "./components/Login";
import Searchbar from "./components/Searchbar";
import Navbar from "./components/Navbar";
import Playlists from "./components/Playlists";
import UserPlaylist from "./components/UserPlaylist";
import NewNavbar from "./components/NewNavbar";

function App() {
	const [userObject, setUserObject] = useState(JSON.parse(localStorage.getItem('user_object')));

	return (
		<div className="App">
			<Router>
				<header>
					<NewNavbar />
				</header>

				<PrivateRoute path="/" exact component={Searchbar} />
				<Route path="/login" component={Login} />
				<PrivateRoute path="/playlists" component={Playlists} />
				<PrivateRoute path="/user-playlist/:id" component={UserPlaylist} />
			</Router>
		</div>
	);
}

export default App;
