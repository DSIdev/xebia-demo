import { user } from "../actions/types"
const init = {
	username: "",
	fullName: "",
	loginTimestamp: "",
}

const userReducer = (state = init, action) => {
	switch (action.type) {
		case user.SET_LOGIN:
			const { username, fullName } = action.payload
			return { ...state, username, fullName, loginTimestamp: Date.now() }
		case user.UNSET_LOGIN:
			return { ...state, username: "", fullName: "" }
		default:
			return state
	}
}

export default userReducer;
