import React from 'react';

const FilterCategory = ({ label, options, filterKey, filterValKey, onSelect, active, formatter }) => {
	if (!(options && options[filterKey])) return null
	console.log({ label, options, filterKey, filterValKey, onSelect, active, formatter })
	return (
		<div className="row">
			<div className="column" style={{ border: "1px solid" }}>
				<span>{label}</span>
				<div className="optionList">
					{options[filterKey].map((op, ind) => (
						<div key={ind} className="filterValue" data-value-op={op.value}>
							<div
								className={`${active[filterKey][op[filterValKey]] ? 'selectedFilter' : ''}`}
								onClick={() => onSelect({ filterType: filterKey, filterName: op[filterValKey] })} >
								{formatter ? formatter(op[filterValKey], op.title) : op.title.toUpperCase()}
							</div>
						</div>))}
				</div>
			</div>
		</div>
	)
}

export default FilterCategory;
