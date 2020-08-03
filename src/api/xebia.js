const api = {}
const BASE_URI = process.env.XEBIA_API || `https://xebiascart.herokuapp.com`;

api.login = (username) => fetch(`${BASE_URI}/users?username=${username}`)
api.fetchProducts = () => fetch(`${BASE_URI}/products`)
api.fetchFilters = () => fetch(`${BASE_URI}/filters`)

export default api