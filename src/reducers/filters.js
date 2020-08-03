import { combineReducers } from 'redux';
import actions from "../actions/types"
const simpleReducerDefault = {
	loading: false,
	data: [],
	error: null,
	simpleActionTime: null
}

const simpleReducer = (state = simpleReducerDefault, action) => {
	switch (action.type) {
		case actions.ASYNC_ACTION_TOGGLE:
			return { ...state, loading: action.payload }

		case actions.ASYNC_ACTION_SUCCESS:
			console.log("FETCH SUCCESS")
			return { ...state, data: action.payload }

		case actions.ASYNC_ACTION_FAILURE:
			console.log("FETCH FAILED")
			return { ...state, error: action.payload }

		case actions.SIMPLE_ACTION:
			console.log('old state', state)
			return { ...state, simpleActionTime: (new Date()).toString() }

		default:
			return state
	}
}

export default combineReducers({ test: simpleReducer });
