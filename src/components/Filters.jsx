import React from 'react';
import FilterCategory from './FilterCategory';
import FilterRange from './FilterRange';

const Filters = ({ onReset, onChange, available, selected }) => {
	return (
		<div className="column column-20" style={{ backgroundColor: "#f4f5f6" }}>
			<span className="float-left">Filters</span>
			<span onClick={onReset} className="button button-clear float-right">Reset</span>
			<FilterCategory
				label="Color"
				active={selected || {}}
				options={available}
				filterKey="color"
				filterValKey="color"
				onSelect={onChange}
				formatter={(value, label) => (<>
					{label.toUpperCase()} <span className="colorPreview" style={{ backgroundColor: value }}></span>
				</>)} />

			<FilterCategory
				label="Brand"
				active={selected || {}}
				options={available}
				filterKey="brand"
				filterValKey="brand"
				onSelect={onChange} />

			<FilterRange
				label="Price"
				options={[]}
				onSelect={() => { }} />

			<FilterRange
				label="Discount"
				options={[]}
				onSelect={() => { }} />
		</div>
	)
}

export default Filters;
