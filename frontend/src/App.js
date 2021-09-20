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

function App() {
	const [activeItem, setActiveItem] = useState('/');
	const [userObject, setUserObject] = useState(JSON.parse(localStorage.getItem('user_object')));

	useEffect(() => {
		setActiveItem(window.location.pathname);
	}, [window.location.pathname])

	function handleItemClick(e, { name }) {
		name === 'home' ? setActiveItem('/') : setActiveItem('/' + name);
	}
	
	return (
		<div className="App">
			<header>
				<Segment inverted>
					<Menu inverted pointing secondary>
						<Menu.Item
							name='home'
							active={activeItem === '/'}
							onClick={handleItemClick}
						/>
						<Menu.Item
							name='playlists'
							active={activeItem === '/playlists'}
							onClick={handleItemClick}
						/>
						<Menu.Item
							name='favorites'
							active={activeItem === '/favorites'}
							onClick={handleItemClick}
						/>
						<Menu.Item
							name='search'
							active={activeItem === '/search'}
							onClick={handleItemClick}
						/>
					</Menu>
				</Segment>
			</header>
			<Router>
				<PrivateRoute path="/" exact component={Searchbar} />
				<Route path="/login" component={Login} />
				<PrivateRoute path="/playlists" component={Playlists} />
				<PrivateRoute path="/user-playlist/:id" component={UserPlaylist} />
			</Router>
		</div>
	);
}

export default App;
