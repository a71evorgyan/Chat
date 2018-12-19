import axios from "axios";
export const setAuthorizationToken = (token) => {
	if (token) {
		axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	} else {
		delete axios.defaults.headers.common["Authorization"];
	}
}

export const authenticateToken = token => {
  localStorage.setItem("access_token", token);
}
export const isUserAuthenticated = () => {
	return localStorage.getItem("access_token") !== null;
} 
export const deauthenticateToken = () => {
	localStorage.removeItem("access_token");
}
export const getToken = () => {
	localStorage.getItem("access_token");
}