import React from 'react';
import { Switch, Route } from "react-router-dom";
import LoginContainer from "./containers/Login"
import ProductsContainer from "./containers/Products"
const Routes = () => (
	<Switch>
		<Route path="/" exact component={LoginContainer} />
		<Route path="/products" component={ProductsContainer} />
	</Switch>
)

export default Routes;