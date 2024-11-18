import axios from "axios";

axios.defaults.baseURL = "https://memories-backend-16d0ed87a1d2.herokuapp.com";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();

 axiosRes.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 || error.response?.status === 404) {
        localStorage.removeItem("currentUser");
        window.location.href = "/"; // Redirect to login page
        }
        return Promise.reject(error);
    }
    );
  
  