const applyColorFilter = (prod, filters) => {
	if (!Object.keys(filters).length) return true
	return (prod.colour && prod.colour.color && Boolean(filters[prod.colour.color]))
}

const applyBrandFilter = (prod, filters) => {
	if (!Object.keys(filters).length) return true
	console.log(prod, filters)
	return (prod.brand && Boolean(filters[prod.brand]))
}

export const applyFilters = (prods, filters) => {
	return prods.filter(prod => {
		return [
			applyColorFilter(prod, filters.color),
			applyBrandFilter(prod, filters.brand)
		].indexOf(false) < 0
	}
	)
}

export const getFilterValues = (allFilters, targetFilterType) => {
	const targetFilterIndex = allFilters.findIndex(filterType => filterType.type === targetFilterType)
	if (targetFilterIndex < 0 || !allFilters[targetFilterIndex].values) return []
	return allFilters[targetFilterIndex].values
}
