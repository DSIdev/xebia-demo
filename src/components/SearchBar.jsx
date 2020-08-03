import React from 'react';

const SearchBar = () => {
	return (
		<form>
			<fieldset>
				<div className="row headerRow">
					<div className="column column-80">
						<input type="text" id="searchTerm" autoComplete="off" />
					</div>
					<div className="column column-20">
						<input className="button-primary" type="submit" value="Search" />
					</div>
				</div>
			</fieldset>
		</form>
	)
}

export default SearchBar;
