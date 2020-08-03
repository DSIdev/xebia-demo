import React, { useState } from 'react';

const validateUserLogin = (FormData) => {
	const valid = { status: true, errors: {} }
	if (FormData.username.length < 3) {
		valid.status = false;
		valid.errors.username = "Too short"
	}
	if (FormData.password.length < 3) {
		valid.status = false;
		valid.errors.password = "Too short password"
	}
	return valid;
}
const LoginForm = (props) => {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [errors, setErrors] = useState({})

	const handleSubmit = (e) => {
		e.preventDefault()
		const isValid = validateUserLogin({ username, password })
		if (isValid.status) {
			props.onSubmit({ username, password })
		}
		else
			setErrors(isValid.errors)
	}

	return (
		<form onSubmit={handleSubmit}>
			<h3>Login</h3>
			<fieldset>
				<label htmlFor="username">Username</label>
				{errors.username && <small className="error">{errors.username}</small>}
				<input
					value={username} onChange={(e) => setUsername(e.target.value)}
					type="text" id="username" autoComplete="off" />

				<label htmlFor="password">Password</label>
				{errors.password && <small className="error">{errors.password}</small>}
				<input
					value={password} onChange={(e) => setPassword(e.target.value)}
					type="password" id="password" />

				<input className="button-primary" type="submit" value="Login" />
			</fieldset>
		</form>
	)
}

export default LoginForm;
