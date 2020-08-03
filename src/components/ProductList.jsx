import React from 'react';
import ProductItem from './ProductItem';
const ProductList = ({ products, onAdd, cartCounts }) => {
	return (
		<div className="column column-80" style={{ backgroundColor: "#666" }}>
			<div className="row" style={{ flexWrap: "wrap" }}>
				{
					products.map((e, i) => (<ProductItem selected={cartCounts[e.id] || 0} item={e} onAdd={onAdd} key={i} />))
				}
			</div>
		</div>
	)
}

export default ProductList;

