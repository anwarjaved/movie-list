import axios from "axios";
import { ApiUrl } from "./environment";

//import { clearToken, getAccessToken, getRefreshToken, saveToken } from "./TokenStorageService";

const API_BASE_URL = ApiUrl; // Replace with your API base URL

const api = axios.create({
	baseURL: API_BASE_URL,
	withCredentials: true,
});


export default api;