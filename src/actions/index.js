import types from "./types";


export const simpleAction = () => ({ type: types.SIMPLE_ACTION })
export const simplePayloadAction = (payload) => ({ payload, type: types.SIMPLE_ACTION_WITH_PAYLOAD })

const setAsyncAction = (status) => ({ type: types.ASYNC_ACTION_TOGGLE, payload: status })
const asyncSuccess = (data) => ({ type: types.ASYNC_ACTION_SUCCESS, data })
const asyncFailure = (error) => ({ type: types.ASYNC_ACTION_FAILURE, error })

export const asyncAction = () => dispatch => {
	dispatch(setAsyncAction(true))
	fetch("https://jsonplaceholder.typicode.com/todos/1")
		.then(response => {
			if (!response.ok) {
				dispatch(setAsyncAction(false))
				throw Error(response.statusText);
			}
			return response;
		})
		.then((response) => response.json())
		.then((items) => {
			dispatch(asyncSuccess(items))
			dispatch(setAsyncAction(false))
		})
		.catch((err) => {
			dispatch(asyncFailure(err))
			dispatch(setAsyncAction(false))
		});
}

export const asyncAction = () => dispatch => {
	dispatch(setAsyncAction(true))
	fetch("https://jsonplaceholder.typicode.com/todos/1")
		.then(response => {
			if (!response.ok) {
				dispatch(setAsyncAction(false))
				throw Error(response.statusText);
			}
			return response;
		})
		.then((response) => response.json())
		.then((items) => {
			dispatch(asyncSuccess(items))
			dispatch(setAsyncAction(false))
		})
		.catch((err) => {
			dispatch(asyncFailure(err))
			dispatch(setAsyncAction(false))
		});
}
