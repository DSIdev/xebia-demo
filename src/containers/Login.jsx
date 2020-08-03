import React from 'react';
import LoginForm from '../components/LoginForm';
import { connect } from "react-redux";
import { loginUser } from "../actions/user";

const LoginContainer = (props) => {
	const submit = async (formData) => {
		const loginResp = await props.loginUser(formData);
		if (loginResp.type.indexOf("ERROR") < 0)
			props.history.replace("/products")
	}
	return (<div className="row">
		<div className="column column-50 column-offset-25">
			{props.loginError && <h3 className="error">{props.loginError}</h3>}
			<LoginForm onSubmit={submit} />
		</div>
	</div>)
}

const mapState = (state) => ({
	loginError: state.user.error
})

const mapDispatch = (dispatch) => ({
	loginUser: (payload) => dispatch(loginUser(payload))
})
export default connect(mapState, mapDispatch)(LoginContainer);