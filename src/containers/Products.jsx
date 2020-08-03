import React, { useReducer, useEffect, useCallback } from 'react';
import Header from "../components/Header";
import Filters from "../components/Filters";
import ProductList from "../components/ProductList";
import { applyFilters, getFilterValues } from "../util/ProductUtils"
import xebia from "../api/xebia"
import { connect } from 'react-redux';

const initState = {
	cartContents: {},
	isLoading: true,
	error: null,
	availableProd: [],
	availableProdById: [],
	filteredProd: [],
	availableFilters: {
		color: [],
		brand: [],
		price: { min: 0, max: 0 },
		discount: { min: 0, max: 0 }
	},
	selectedFilters: {
		color: {},
		brand: {},
		price: { min: 0, max: 0 },
		discount: { min: 0, max: 0 }
	},
}

const productReducer = (state, action) => {
	switch (action.type) {
		case "GET_STATE":
			return console.log(state) || state;

		case "ADD_TO_CART":
			const cartValues = state.cartContents[action.payload] ? { ...state.cartContents, [action.payload]: state.cartContents[action.payload] + 1 } : { ...state.cartContents, [action.payload]: 1 }
			return { ...state, cartContents: cartValues }

		case "SET_FILTER":
			const { payload } = action
			let modifiedFilters = {}
			if (state.selectedFilters[payload.filterType][payload.filterName]) {
				// Remove state.selectedFilters.['color']['#000000']
				const { [payload.filterName]: val, ...remainingFilters } = state.selectedFilters[payload.filterType];
				modifiedFilters = {
					...state.selectedFilters,
					[payload.filterType]: remainingFilters
				}
			}
			else {
				// state.selectedFilters.['color']['#000000']: true
				modifiedFilters = {
					...state.selectedFilters,
					[payload.filterType]: {
						...state.selectedFilters[payload.filterType],
						[payload.filterName]: true
					}
				}
			}
			return {
				...state,
				selectedFilters: modifiedFilters,
				filteredProd: applyFilters(state.availableProd, modifiedFilters)
			}

		case "RESET_FILTER":
			const newSelectedFilters = {}
			for (let filter in state.selectedFilters)
				newSelectedFilters[filter] = {}
			return {
				...state,
				selectedFilters: newSelectedFilters,
				filteredProd: applyFilters(state.availableProd, newSelectedFilters)
			}

		case "FETCH_PRODUCTS_FILTERS":
			const colorFilters = getFilterValues(action.payload.filters, "COLOUR")
			const productsById = action.payload.products.reduce((idMapper, prod) => ({ ...idMapper, [prod.id]: prod }), {})
			const brandFilters = action.payload.products.reduce((filter, prod) => {
				if (filter.brandSet.indexOf(prod.brand) < 0) {
					filter.brandSet.push(prod.brand)
					return {
						...filter,
						values: [...filter.values, { brand: prod.brand, title: prod.brand }]
					}
				}
				return filter
			}, { brandSet: [], values: [] })
			return {
				...state,
				isLoading: false,
				error: null,
				availableProdById: productsById,
				filteredProd: action.payload.products,
				availableProd: action.payload.products,
				availableFilters: { color: colorFilters, brand: brandFilters.values },
				selectedFilters: {
					brand: {},
					color: {} //initFilterValues(colorFilters, "color") 
				}
			}

		case "SET_ERROR":
			return { ...state, error: action.payload }

		default:
			return state
	}
}

const ProductsContainer = (props) => {
	const [state, dispatch] = useReducer(productReducer, initState)

	const addToCart = (prodId) => dispatch({
		type: "ADD_TO_CART",
		payload: prodId
	});

	const setFilter = useCallback(({ filterType, filterName }) => {
		dispatch({
			type: "SET_FILTER",
			payload: { filterType, filterName }
		})
	}, [])

	const resetFilter = () => dispatch({ type: "RESET_FILTER" })

	useEffect(() => {
		// Mounting effect
		const getProds = xebia.fetchProducts(); //fetch("http://localhost:9001/products")
		const getFilters = xebia.fetchFilters(); //fetch("http://localhost:9001/filters")
		Promise.all([getProds, getFilters])
			.then((response) => {
				const [productResponse, filterResponse] = response;
				const products = productResponse.json()
				const filters = filterResponse.json()
				return Promise.all([products, filters])
			})
			.then((jsonResponse) => {
				const [products, filters] = jsonResponse;
				dispatch({
					type: "FETCH_PRODUCTS_FILTERS",
					payload: { products, filters }
				})
			})
			.catch(error => dispatch({
				type: "SET_ERROR",
				payload: `ERROR: ${error.toString()}`
			}))
	}, [])

	return (
		<div>
			<Header user={props.user} cartCount={Object.keys(state.cartContents).length} />
			<input type="button" value="GET STATE" onClick={() => dispatch({ type: "GET_STATE" })} />
			{state.error && <h3 className="error">{state.error}</h3>}
			{state.isLoading ?
				<h1 style={{ textAlign: "center" }}>Loading</h1> :
				<div className="row">
					<Filters
						available={state.availableFilters}
						selected={state.selectedFilters}
						onReset={resetFilter}
						onChange={setFilter} />

					<ProductList
						cartCounts={state.cartContents}
						products={state.filteredProd}
						onAdd={addToCart} />
				</div>
			}
		</div >
	)
}

const mapState = (state) => ({
	user: state.user
})

export default connect(mapState)(ProductsContainer);