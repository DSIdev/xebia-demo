import React from 'react';

const ProductItem = ({ item, onAdd, selected }) => {
	return (<div className="column column-33"
		style={{ color: "#333", padding: "5px", border: "1px solid #efefef", backgroundColor: "#fff" }}>
		<div className="prodImg">
			<img alt={item.title} src={item.image} />
		</div>
		<div className="prodDetails">
			<small><strong>{item.title}</strong></small><br />
			<small>{item.colour && <div className="float-right" style={{ borderRadius: '100%', backgroundColor: item.colour.color, width: 15, height: 15 }}></div>}{item.brand}</small><br />
			<span onClick={() => onAdd(item.id)} className="button button-small button-outline float-right">{selected ? `${selected} ADDED` : `+ ADD`}</span>
		</div>
	</div>
	)
}

export default ProductItem;
