import { userActions } from "../actions/types"
const init = {
	username: "",
	fullName: "",
	loginTimestamp: "",
	error: null
}

const userReducer = (state = init, action) => {
	switch (action.type) {
		case userActions.SET_LOGIN:
			const { username, fullName, userId } = action.payload
			return { ...state, username, fullName, loginTimestamp: Date.now(), userId }
		case userActions.UNSET_LOGIN:
			return { ...state, username: "", fullName: "" }
		case userActions.SET_LOGIN_ERROR:
			return { ...state, error: action.payload }
		default:
			return state
	}
}

export default userReducer;
