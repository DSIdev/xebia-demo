import React from 'react';

const FilterCategory = ({ label, options, onSelect }) => {
	return (
		<div className="row">
			<div className="column" style={{ border: "1px solid" }}>
				<span>{label}</span>

			</div>
		</div>
	)
}

export default FilterCategory;
