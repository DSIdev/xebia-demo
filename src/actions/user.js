import { userActions } from "./types";
import xebia from "../api/xebia"
const setLogin = (payload) => ({
	type: userActions.SET_LOGIN,
	payload
})

const unsetLogin = () => ({
	type: userActions.UNSET_LOGIN
})

const setLoginError = (payload) => ({
	type: userActions.SET_LOGIN_ERROR,
	payload
})

export const loginUser = (formData) => dispatch => {
	return xebia.login(formData.username)
		.then((response) => response.json())
		.then((cred) => {
			if (Array.isArray(cred))
				return cred.length ? dispatch(setLogin(cred)) : dispatch(setLoginError("Invalid credentials"))
			else
				return dispatch(setLoginError("Error while logging in"))
		})
		.catch((error) => dispatch(setLoginError(error.toString())));
}

export const logoutUser = () => dispatch => {
	// Invalidate token
	return fetch("https://jsonplaceholder.typicode.com/todos/1")
		.then((response) => response.json())
		.then((status) => dispatch(unsetLogin()))
		.catch(console.error);
}

