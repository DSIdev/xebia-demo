import React from 'react';
import SearchBar from './SearchBar';
import Cart from './Cart';

const Logo = () => (
	<div className="logo"></div>
)
const Header = (props) => {
	return (
		<div className="row headerRow">
			<div className="column column-10">
				<Logo />
			</div>
			<div className="column column-70">
				<SearchBar />
			</div>
			<div className="column column-20">
				<p>User: </p>
				<Cart count={props.cartCount} />
			</div>
		</div>
	)
}

export default Header;
