import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Menu, Segment } from 'semantic-ui-react';

function Navbar() {
	const [activeItem, setActiveItem] = useState('/');
	const [userObject, setUserObject] = useState(JSON.parse(localStorage.getItem('user_object')));
	const history = useHistory();

	useEffect(() => {
		setActiveItem(window.location.pathname);
	}, [window.location.pathname])

	function handleItemClick(e, { name }) {
		name === 'home' ? setActiveItem('/') : setActiveItem('/' + name);
		history.push(name === 'home' ? '/' : '/' + name);
	}
	
	return (
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
	);
}

export default Navbar;
